const { Server } = require('socket.io');
const auth = require("./middleware/auth");
let Message = "";

function init(httpServer, models) {
    // ici : on branche Socket.IO sur l'application express
    // pour écoute conjointe HTTP / WebSocket
    const io = new Server(httpServer);
    const {Room} = models;
    io.use(require("./middleware/auth")(models));

    //-- Connexion du Socket.io
    io.on("connection", (socket) => {
        // Ici on peut authentifier l'utilisateur
        // const token = socket.handshake.auth.token;
        console.log(`User ${socket.user.username} connected`); //-- Log in server
        socket.broadcast.emit(
            "connected",
            `${socket.user.username} s'est connecté`
        ); // DEBUG

        // socket.broadcast.emit('notify', `Broadcast from ${socket.id}`);

        //-- Sys. pour déconnecter son Socket.io
        socket.on("disconnect", () => {
            console.log(`User ${socket.user.username} disconnected`);
        });


        //-- Gestion des utiliateurs
        const users = [];
        for (let [id, socket] of io.of("/").sockets) {
            users.push({
                userID: socket.id,
                username: socket.user.username,
                // userPic: socket.user.avatar,
                // userMail: socket.user.email,
            });
        }
        socket.emit("users", users);

        //-- Sys. pour rentrer dans une salle
        socket.on("enter_room", (room) => {
            socket.join(room);

            models.Message.findAll({
                where: {
                    RoomId: room,
                }
              }).then((msgs) => {
                for (let i = 0; i < msgs.length; i++) {
                                const message = msgs[i];
                                socket.emit("message", message);
                }
              })
            
            socket.emit("message", `Vous etes entrez dans le chat #${room}`)
        });

        //-- Sys. pour sortir d'une salle
        socket.on("leave_room", (room) => {
            socket.leave(room);
        });

        //-- Sys. pour ajouter un message
        socket.on("message", (msgData) => {
            // data.date = new Date();
            const { message, charaId, room } = msgData;

            console.log(msgData);
            const msg = new models.Message({
                message : message,
                CharacterId : charaId,
                RoomId : room
            })

            msg.save()
                .then(() => {
                    /*
                            Le message est stocké
                            On le relaie à tous les utilisateurs dans le salon correspondant
                        */
                    io.to(msgData.room).emit("message", msgData);
                })
                .catch((e) => {
                    console.log(e);
                });
        });
    });

    return io;
}

module.exports = { init };