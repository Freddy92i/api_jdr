const { restart } = require("nodemon");
const { DataTypes: { INTEGER } } = require("sequelize");
const skill = require("./skill");
const jwt = require("jsonwebtoken");

module.exports = function ({ Class, Skill, User }, log) {
  const create = async (req, res, next) => {
    const token = req.headers.authorization;
    
    const { sub } = jwt.decode(token, process.env.SECRET_TOKEN, { algorithms: ['HS256'] })
    // const userNf = decodedToken.username;
    
    const user = await User.findOne({ where: { username: sub } })
    console.log(user);

    if (user.admin == true ) {
      if (!req.body.name || !req.body.life_point || !req.body.strength || !req.body.agility || !req.body.intelligence || !req.body.initiative || !req.body.social) {
        log.addLog("Création_Classe" , "Données oubliées !", null, null)
        return res.status(400).json({
          error: "Données oubliées !",
        });
      }
      Class.findOne({
        where : {
          name : req.body.name
        }
      }).then((klass) => {
        if(klass) {
          log.addLog("Création_Classe", "Classe déjà existante", null, null)
          res.status(400).json({
            message : "Classe déjà existante !"
          })
        }
        else {
          const klass = new Class({
            name: req.body.name,
            life_point: req.body.life_point,
            strength: req.body.strength,
            agility: req.body.agility,
            intelligence: req.body.intelligence,
            initiative: req.body.initiative,
            social: req.body.social,
          });
          klass.save()
          .then(() => {
            log.addLog("Création_classe" , "Classe créée : ", klass.name, null, klass.id)
            res.status(201).json({
              message: "Classe créée !",
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
        message : "Vous n'êtes pas authorizé à créer une classe"
      });
    }
  }

  const edit = async (req, res, next) => {
    console.log(Class);
    const id = req.params.id;
    console.log(req.body);
    if (id) {
      const klass = await Class.findByPk(id);
      if (klass == null){
        log.addLog("Modifcation_Classe", "Aucune classe ne correspond à l'id soumis !", null, null)
        res.status(400).json({
          message : "Aucune Classe ne correspond à l'id soumis"
        })
      } 
      else {

        console.log(klass);
        klass.set( 
          req.body
        )
        klass.save()
        .then(() => {
          log.addLog("Modification_Classe", "Classe modifiée !", null, null)
          res.status(200).json({
            message : "Classe modifiée !"
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
    const klass = await Class.findAll();
    res.json(klass);
    return klass;
  }

  const getById = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    if (id) {
      const klass = await Class.findByPk(id);
      res.json(klass);
      return klass;
    }

  }


  return {
    create,
    edit,
    getAll,
    getById
  }
}
