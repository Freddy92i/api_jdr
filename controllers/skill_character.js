module.exports = function({ Skill_Character }, log) {
  
    const create = (req, res, next) => {
            if (!req.body.CharacterId || !req.body.SkillId ) {
            log.addLog("Création_Item", "Données oubliées !", null, null)
            return res.status(400).json({
                error: "Données oubliées !",
            });
            }
            const skillC= new Skill_Character({
              CharacterId: req.body.CharacterId,
              SkillId: req.body.SkillId
            });
            skillC.save()
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
  