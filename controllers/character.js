module.exports = function ({ Character }) {
  const create = (req, res, next) => {
    // if (!req.body.name || !req.body.level || !req.body.biography || !req.body.melee_damage || !req.body.remote_damage || !req.body.defense  || !req.body.life_point || !req.body.strength || !req.body.agility || !req.body.intelligence || !req.body.initiative || !req.body.social || !req.body.is_npc) {
    //   // log.addLog("Création_personnage" , "Données oubliées !", null, null)
    //   return res.status(400).json({
    //     error: "Données oubliées !",
    //   });
    // }
    const character = new Character({
      name: req.body.name,
      level: req.body.level,
      biography: req.body.biography,
      melee_damage: req.body.melee_damage,
      remote_damage: req.body.remote_damage,
      defense: req.body.defense,
      life_point: req.body.life_point,
      strength: req.body.strength,
      agility: req.body.agility,
      intelligence: req.body.intelligence,
      initiative: req.body.initiative,
      social: req.body.social,
      is_npc: req.body.is_npc,
      UserId: req.body.UserId,
      ClassId: req.body.ClassId,
      RaceId: req.body.RaceId,
    });

    character.save()
      .then((chara) => {
        // log.addLog("Création_personnage" , "Personnage créé ! ", Character.name, null)
        res.status(201).json({
          message: chara.id,
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
    Character.findOne({
      where: {
        name: req.body.name,
      }
    })
      .then((Character) => {
        Character.set({
          name: req.body.name,
          level: req.body.level,
          biography: req.body.biography,
          melee_damage: req.body.melee_damage,
          remote_damage: req.body.remote_damage,
          defense: req.body.defense,
          life_point: req.body.life_point,
          strength: req.body.strength,
          agility: req.body.agility,
          intelligence: req.body.intelligence,
          initiative: req.body.initiative,
          social: req.body.social,
          is_npc: req.body.is_npc,
          UserId: req.body.UserId,
          ClassId: req.body.ClassId,
          RaceId: req.body.RaceId,
        })

        Character.save()
        .then(() => {
          log.addLog("Modification_personnage" , "Personnage modifié : ", Character.name, null)
          res.status(201).json({
            message: "Personnage créé !",
          })
        }
        )
        .catch((error) =>
          res.status(403).json({
            error,
          })
        );
      })


  }

  const getAll = async (req, res, next) => {
    const chara = await Character.findAll({
      attributes: ['name', 'level']
    });
    res.json(chara);
    return chara;
  }

  const getAllByUserId = async (req, res, next) => {
    const chara = await Character.findAll({
      where: {
        UserId: req.body.UserId,
      }
    });
    res.json(chara);
    // return Array(chara) 
    res.send({chara});
  }

  const getById = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    if (id) {
      const chara = await Character.findByPk(id);
      res.json(chara);
      return chara;
    }

  }


  return {
    create,
    edit,
    getAll,
    getById,
    getAllByUserId
  }
}
