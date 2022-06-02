module.exports = function ({ Room }, log) {
    const create = (req, res, next) => {
        if (!req.body.name ) {
            log.addLog("Création_Partie", "Données oubliées !", null, null)
            return res.status(400).json({
                error: "Données oubliées !",
            });
        }
        Room.findOne({
            where: {
                name: req.body.name
            }
        })
            .then((room) => {
                if (room) {
                    log.addLog("Création_room", "room déjà existante", null, null)
                    res.status(400).json({
                        message: "room déjà existant !"
                    })
                }
                else {
                    const room = new Room({
                        name: req.body.name
                    });
                    room.save()
                        .then(() => {
                            log.addLog("Création_room", "room créé : ", room.name, null)
                            
                            res.status(201).json({
                                message: room.id,
                            })

                        })
                        .catch((error) =>
                            res.status(403).json({
                                error,
                            })
                        );
                }
            })
    }

    const getAll = async (req, res, next) => {
        const room = await Room.findAll();
        res.json(room);
        return room ;
      }
    return {
        create,
        getAll
    }
}
