module.exports = function({ Item_Character }, log) {
  
    const create = (req, res, next) => {
            if (!req.body.CharId || !req.body.ItemId ) {
            log.addLog("Création_Item", "Données oubliées !", null, null)
            return res.status(400).json({
                error: "Données oubliées !",
            });
            }
            const itemC = new Item_Character({
              CharacterId: req.body.CharId,
              ItemId: req.body.ItemId
            });
            itemC.save()
            .then(() => {
              res.status(201).json({
                message: "liaison Item Character créée !",
              })
            })
            .catch((error) =>
              res.status(403).json({
                error,
              })
            );
          
        }
      
  
    return {
      create
     
    }
  }
  