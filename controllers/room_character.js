module.exports = function ({ Room_Character , Character }, log) {
    const create = (req, res, next) => {
        if (!req.body.roomId || !req.body.characterId ) {
            log.addLog("Création_Partie", "Données oubliées !", null, null)
            return res.status(400).json({
                error: "Données oubliées !",
            });
        }

        Room_Character.findOne({
            where: {
                RoomId: req.body.roomId,
                CharacterId: req.body.characterId

            }
        })
            .then((roomChara) => {
                if (roomChara) {
                    log.addLog("Laison partie joueur", "room déjà existante", null, null)
                    res.status(400).json({
                        message: "roomCharcter déjà existant !"
                    })
                }
                else {
                    const roomChara = new Room_Character({
                        RoomId: req.body.roomId,
                        CharacterId: req.body.characterId
                    });

                    // console.log(room);

                    roomChara.save()
                        .then(() => {
                            log.addLog("Laison partie joueur", "room créé : ", room.name, null)
                            
                            res.status(201).json({
                                message: "Laison partie joueur créé !",
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

    const getAllById = async (req, res, next) => {
        const id = req.params.id;
        const chara = await Room_Character.findAll({
            where: {
                RoomId: id,
            }
          });
          res.json(chara);
          // return Array(chara) 
        //   res.send({chara});
      }

    return {
        create,
        getAllById
    }
}
