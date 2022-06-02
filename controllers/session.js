module.exports = function({ Session }) {
    const create = (req, res, next) => {
        if (!req.body.name) {
          log.addLog("Création_Session" , "Données oubliées !", null, null)
            return res.status(400).json({
              error: "Données oubliées !",
            });
          }
          const sess = new Session({
            name: req.body.name,
          });

          sess.save()
                      .then(() => {
                        log.addLog("Création_Classe" , "Session créée : ", sess.name, null)
                        res.status(201).json({
                          message: "Session créée !",
                        })
                      }
                      )
                      .catch((error) =>
                        res.status(403).json({
                          error,
                        })
                      );
    }

    const edit = (req, res, next) => {
      Session.findOne({
        where: {
          name: req.body.name,
        }
      })
      .then((Session) => {
        Session.set({
        name: req.body.name,
      })

      Session.save();
    })

      
  }
   
    const getAll = async (req, res, next) => {
      const sess = await Session.findAll();
      res.json(sess);
      return sess ;
    }

    const getById = async (req, res, next) => {
      const id = req.params.id;
      console.log(id);
      if (id) {
        const sess = await Session.findByPk(id);
        res.json(sess);
        return sess ;
      }
      
    }


    return {
        create,
        edit,
        getAll,
        getById
    }
}
