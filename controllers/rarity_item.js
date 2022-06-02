const { restart } = require("nodemon");
const { DataTypes: { INTEGER } } = require("sequelize");
const skill = require("./skill");
const jwt = require("jsonwebtoken");

module.exports = function ({ RarityItem , User }, log) {
  const create = async (req, res, next) => {
    const token = req.headers.authorization;
    
    const { sub } = jwt.decode(token, process.env.SECRET_TOKEN, { algorithms: ['HS256'] });
    const user = await User.findOne({ where: { username: sub } });
    // console.log(user);

    if (user.admin == true ) {
      if (!req.body.name || !req.body.nbMax ) {
        // log.addLog("Création_RarityItem" , "Données oubliées !", null, null)
        return res.status(400).json({
          error: "Données oubliées !",
        });
      }
      RarityItem.findOne({
        where : {
          name : req.body.name
        }
      }).then((rarity) => {
        if(rarity) {
          // log.addLog("Création_RarityItem", "RarityItem déjà existante", null, null)
          res.status(400).json({
            message : "RarityItem déjà existante !"
          })
        }
        else {
          const rarity = new RarityItem({
            name: req.body.name,
            nbMax: req.body.nbMax
          });
          rarity.save()
          .then(() => {
            // log.addLog("Création_RarityItem" , "RarityItem créée : ", rarity.name, null, rarity.id)
            res.status(201).json({
              message: "RarityItem créée !",
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
    else {
      return res.status(401).json({
        message : "Vous n'êtes pas authorizé à créer une RarityItem"
      });
    }
  }

  const edit = async (req, res, next) => {
    const id = req.params.id;
    if (id) {
      const rarity = await RarityItem.findByPk(id);
      if (rarity == null){
        log.addLog("Modifcation_RarityItem", "Aucune RarityItem ne correspond à l'id soumis !", null, null)
        res.status(400).json({
          message : "Aucune RarityItem ne correspond à l'id soumis"
        })
      } 
      else {
        rarity.set({
          name: req.body.name,
          nbMax: req.body.nbMax,
          
        })
        rarity.save()
        .then(() => {
          log.addLog("Modification_RarityItem", "RarityItem modifiée !", null, null)
          res.status(200).json({
            message : "RarityItem modifiée !"
          })
        })
        .catch((error) =>{
          res.status(403).json({
            error
          })
        })
      }
    }
  }

  const getAll = async (req, res, next) => {
    const rarity = await RarityItem.findAll();
    res.json(rarity);
    return rarity;
  }

  const getById = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    if (id) {
      const rarity = await RarityItem.findByPk(id);
      res.json(rarity);
      return rarity;
    }

  }


  return {
    create,
    edit,
    getAll,
    getById
  }
}
