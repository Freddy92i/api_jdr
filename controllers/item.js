module.exports = function({ Item }, log) {
  const create = (req, res, next) => {
    if (!req.body.name ) {
      log.addLog("Création_Item", "Données oubliées !", null, null)
      return res.status(400).json({
        error: "Données oubliées !",
      });
    }

    Item.findOne({
      where: {
        name: req.body.name
      }
    })
    .then((item) => {
      if (item) {
        log.addLog("Création_Item", "Item déjà existante", null, null)
        res.status(400).json({
          message : "Item déjà existant !"
        })
      }
      else {
        const item = new Item({
          name: req.body.name,
          description: req.body.description,
          RarityItemId: req.body.rarityItemId,
        });

        console.log(item);
    
        item.save()
        .then(() => {
          log.addLog("Création_item" , "Item créé : ", item.name, null)
          res.status(201).json({
            message: "Item créé !",
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

  const edit = async (req, res, next) => {
    const id = req.params.id
    if (id) {
      const skill = await Item.findByPk(id)
      if (skill == null){
        log.addLog("modification_Item", "Aucun Item ne correspond à l'id soumis !", null, null)
        res.status(400).json({
          message : "Aucun Item ne correspond à l'id soumis !"
        })
      }
      else {
        skill.set({
          name: req.body.name,
          description: req.body.description,
          //RarityItemId: req.body.RarityItemId,
        })
        skill.save()
        .then(() => {
          log.addLog("Modification_Item", "Item modifié avec succès !", null, null)
          res.status(201).json({
            message : "Item modifié avec succès !"
          })
        })
      }
    }
    // Item.findOne({
    //   where: {
    //     name: req.body.name,
    //   }
    // })
    // .then((Item) => {
    //   Item.set({
    //   name: req.body.name,
    //   description: req.body.description,
    //   RarityItemId: req.body.RarityItemId,
    // })
    // Item.save();
    // })
 }
   
  const getAll = async (req, res, next) => {
    const item = await Item.findAll();
    res.json(item);
    return item ;
  }

  const getById = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    if (id) {
      const item = await Item.findByPk(id);
      res.json(item);
      return item ;
    }
  }

  return {
    create,
    edit,
    getAll,
    getById
  }
}
