module.exports = function ({ Race }, log) {
    const create = (req, res, next) => {
        if (!req.body.name || !req.body.life_point || !req.body.strength || !req.body.agility || !req.body.intelligence || !req.body.initiative || !req.body.social) {
            log.addLog("Création_Race" , "Données oubliées !", null, null)
            return res.status(400).json({
                error: "Données oubliées !"
            });
        }


        Race.findOne({
            where: {
                name: req.body.name,
            }
        })
            .then((race) => {
                if (race) {
                    log.addLog("Création_Race" , "Race déjà existante !", null, null)
                    res.status(400).json({
                        message: "Race déjà existante !",
                    })
                }
                else {
                    const race = new Race({
                        name: req.body.name,
                        // melee_damage: req.body.melee_damage,
                        // remote_damage: req.body.remote_damage,
                        // defense: req.body.defense,
                        life_point: req.body.life_point,
                        strength: req.body.strength,
                        agility: req.body.agility,
                        intelligence: req.body.intelligence,
                        initiative: req.body.initiative,
                        social: req.body.social

                    });

                    race.save()
                        .then(() => {
                            log.addLog("Création_Race" , "Race créée : ", race.name, null)
                            res.status(201).json({
                                message: "Race créée !",
                            })
                        }
                        )
                        .catch((error) =>
                            res.status(403).json({
                                error,
                            })
                        );

                }



            })

    }

    const edit = async (req, res, next) => {
        const id = req.params.id;
        // console.log(id);
        if (id) {
            const race = await Race.findByPk(id);
            if (race == null){
                log.addLog("Edit_Race", "Aucune Race ne correspond à l'id soumis !", "id race soumis : "+req.params.id, null)
                res.status(400).json({
                    message : "Aucune Race ne correspond à l'id soumis !"
                })
            }
            else {
                race.set({
                    name: req.body.name,
                    melee_damage: req.body.melee_damage,
                    remote_damage: req.body.remote_damage,
                    defense: req.body.defense,
                    image: req.body.image,
                    life_point: req.body.life_point,
                    strength: req.body.strength,
                    agility: req.body.agility,
                    intelligence: req.body.intelligence,
                    initiative: req.body.initiative,
                    social: req.body.social
                })
                race.save()
                .then(() => {
                    log.addLog("Modification_Race" , "Race modifié : ", req.body.name, null)
                    res.status(201).json({
                        message: "Race modifiée avec succès !",
                    })
                }
                )
                .catch((error) =>
                    res.status(403).json({
                    error,
                    })
                );
            }
        }
        
        
       
          
            


    }

    const getAll = async (req, res, next) => {
        const race = await Race.findAll();
        res.json(race);
        return race;
    }

    const getById = async (req, res, next) => {
        const id = req.params.id;
        console.log(id);
        if (id) {
            const race = await Race.findByPk(id);
            res.json(race);
            return race;
        }

    }


    return {
        create,
        edit,
        getAll,
        getById
    }
}
