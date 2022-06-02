module.exports = function({ Skill }, log) {
  const create = (req, res, next) => {
    if (!req.body.name) {
      // log.addLog("Création_Compétance" , "Données oubliées !", null, null)
      return res.status(400).json({
        error: "Données oubliées !",
      });
    }
    Skill.findOne({
      where: {
          name: req.body.name,
      }
    })
    .then((skill) => {
      if (skill) {
        // log.addLog("Création_Compétance" , "Compétance déjà existante !", null, null)
        res.status(400).json({
          message: "Compétence déjà existante !",
        })
      }
      else {
        const skill = new Skill({
          name: req.body.name,
          stat: req.body.stat,
        });
        skill.save()
        .then(() => {
          res.status(201).json({
            message: "Compétence créée !",
          })
          // log.addLog("Création_Compétance" , "Compétance créée : ", req.body.name , null)
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
    if (id){
      const skill = await Skill.findByPk(id);
      if (skill == null){
        log.addLog("modifcation_Compétance", "Auncun Compétance ne correspond à l'id soumis !", null, null)
        res.status(400).json({
          message : "Aucune Compétance ne correspond à l'id soumis !"
        })
      }
      else{
        skill.set({
          name: req.body.name,
          stat: req.body.stat,
        })
        skill.save()
        .then(() => {
          log.addLog("Modification_Compétance" , "Compétance modifié : ", null, null)
          res.status(201).json({
            message: "Compétance modifiée avec succès !",
          })
        })
      }
    }
  //   Skill.findOne({
  //     where: {
  //       name: req.body.name,
  //     }
  //   })
  //   .then((Skill) => {
  //     Skill.set({
  //       name: req.body.name,
  //       stat: req.body.stat,
  //     })
  //     Skill.save();
  //   })
  // }
  }
   
  const getAll = async (req, res, next) => {
    const skill = await Skill.findAll();
    res.json(skill);
    return skill ;
  }

  const getById = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    if (id) {
      const skill = await Skill.findByPk(id);
      res.json(skill);
      return skill ;
    }
 
  }


  return {
    create,
    edit,
    getAll,
    getById
  }
}
