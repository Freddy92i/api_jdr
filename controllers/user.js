// Importation du package de cryptage des mots de passe
const bcrypt = require("bcrypt");
// Importation du package qui permet de créer et de vérifier les tokens d'authentification
const jwt = require("jsonwebtoken");

module.exports = function ({ User }) {

  const getUser = async (req, res) => {
    const { token } = req.cookies;
    const { sub } = jwt.decode(token, process.env.SECRET_TOKEN, { algorithms: ['HS256'] })
    const user = await User.findOne({ where: { username: sub } })

    res.json(user);
  } 

  // TEST

  const getAll = async (req, res, next) => {
    const users = await User.findAll({
      attributes: [ 'id' , 'username' , 'firstname' , 'lastname' , 'admin']
    });

    res.json(users);
  }

  const getById = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    if (id) {
      try {
        const users = await User.findByPk(id);
        if (users) {
          res.json(users);
        return users ;
        }
        else{
          return res.status(404).json({
            error: "L'utilisateur n'existe pas",
          });
        }
        
        
      } catch (err) {
        return res.status(500).json({
          error: err,
        });
      }
      
    }
    else{
      return res.status(400).json({
        error: "Aucun parametre dans l'URL",
      });
    }
    
  }

  return {
    getUser,
    getAll,
    getById
  }
}
