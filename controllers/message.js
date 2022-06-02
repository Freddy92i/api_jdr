module.exports = function({ Message }) {
    const create = (req, res, next) => {
        if (!req.body.message || !req.body.CharacterId || !req.body.RoomId) {
          log.addLog("Message" , "Données oubliées !", null, null)
            return res.status(400).json({
              error: "Données oubliées !",
            });
          }
          const msg = new Message({
            message: req.body.message,
            CharacterId: req.body.CharacterId,
            RoomId: req.body.RoomId,
          });

          msg.save()
                      .then(() => {
                        log.addLog("Message" , "Message créé : ", "Perso : "+msg.CharacterId+", Room : "+msg.RoomId, null)
                        res.status(201).json({
                          message: "Message créé !",
                        })
                      }
                      )
                      .catch((error) =>
                        res.status(403).json({
                          error,
                        })
                      );
    }

   
    const getAll = async (req, res, next) => {
      const msg = await Message.findAll();
      res.json(msg);
      return msg ;
    }


    const getById = async (req, res, next) => {
      const id = req.params.id;
      console.log(id);
      if (id) {
        const msg = await Message.findByPk(id);
        res.json(msg);
        return msg ;
      }
      
    }


    return {
        create,
        getAll,
        getById
    }
  }
