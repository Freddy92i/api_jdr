// Importation du package de cryptage des mots de passe
const bcrypt = require("bcrypt");
// Importation du package qui permet de créer et de vérifier les tokens d'authentification
const jwt = require("jsonwebtoken");

module.exports = function ({ User }, log) {

  const signup = (req, res, next) => {
    if (!req.body.username || !req.body.firstname || !req.body.lastname || !req.body.password) {
      log.addLog("Création_User" , "Données oubliées !", null, null)
      return res.status(400).json({
        error: "Données oubliées !",
      });
    }

    User.findOne({
      where: {
        username: req.body.username,
      }
    })
      .then((user) => {
        if (user) {
          log.addLog("Création_User" , "Username exciste déjà : ", req.body.username, null)
          return res.status(404).json({
            error: "Username déjà existant !"
          })
        }
        else {

          const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z0-9\d@$!%*?&]{8,}$/;
          const password = req.body.password;

          if (password.match(regex)) {
            bcrypt
              .hash(password, 10)
              .then((hash) => {
                const user = new User({
                  username: req.body.username,
                  firstname: req.body.firstname,
                  lastname: req.body.lastname,
                  password: hash,
                  admin: false
                });
                user
                  .save()
                  .then(() => { 
                    log.addLog("Création_User" , "Utilisateur créé ! ", "username : "+user.username, null)
                    res.status(201).json({
                      message: "Utilisateur créé !",
                    })
                  }
                  )
                  .catch((error) => {
                    res.status(403).json({
                      error,
                    })
                  }
                  );
                  
              })
              .catch((error) => {
                console.log(error)
                res.status(500).json({
                  error,
                })
              });
          } else {
            log.addLog("Création_User" , "Mot de passe non sécurisé !", null, null);
            res.status(400).json({
              message: "Le mot de passe n'est pas assez sécurisé",
            })
            
          }
        }
      })
  };



  const login = (req, res, next) => {
    User.findOne({
      where: {
        username: req.body.username,
      }
    })
      .then((user) => {
        
        if (!user) {
          log.addLog("Connexion" , "Utilisateur introuvable : ", req.body.username, null);
          return res.status(404).json({
            message : "Utilisateur non trouvé !",
          });
        }
        bcrypt
          .compare(req.body.password, user.password)

          .then((valid) => {
            if (!valid) {
              //log.addLog("Connexion" , "mot de passe incorrect : ", user.username, user.id);
              return res.status(401).json({
                message : "Mot de passe incorrect !",
              });
            }
            const token = jwt.sign(
              {},
              process.env.SECRET_TOKEN,
              {
                expiresIn: "24h",
                algorithm: "HS256",
                subject: user.username
              }
            );
            res.cookie("token", token, { httpOnly: true });
            log.addLog("Connexion" , "Nouvel utilisateur connecté : ", user.username, user.id);
            res.status(200).json({
              token,
            });
          })
          .catch((error) => {
            const { message, name } = error;
            res.status(500).json({
              message: "ERR 1"
            })
          });
      })
      .catch((error) => {
        const { message, name } = error;
        res.status(500).json({
          message: "ERR 2"
        })
      });
  };

  const logout = (req, res) => {
    const user = req.user;
    log.addLog("Déconnexion", "Un invocateur c'est décnnecté : ", user, null)
    res.clearCookie("token");
    res.status(204).end();
  }

  const getToken = (req, res) => {
    let { token } = req.cookies;
    if (token) {
      res.json({ token });
    } else {
      log.addLog("connexion" , "Non autorisé !", null, null);
      res.status(401).json({ error: { message: "Not authenticated" } });
    }
  };

  return {
    signup,
    login,
    getToken,
    logout
  }
}
