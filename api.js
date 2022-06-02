
function index(req, res) {
    res.send("API JDR PPE");
}

const auth = require('./middleware/api/auth');

function init(app, models, log) {
    app.get('/', index);

    app.use('/auth', require('./routes/auth')(models, log));
    app.use('/users', auth ,require('./routes/user')(models, log));
    app.use('/characters', auth , require('./routes/character')(models, log));
    app.use('/Usercharacter', auth , require('./routes/usercharacter')(models, log));
    app.use('/classes', auth , require('./routes/class')(models, log));
    app.use('/items', auth , require('./routes/item')(models, log));
    app.use('/itemscharacter', auth , require('./routes/item_character')(models, log));
    app.use('/skillscharacter', auth , require('./routes/skill_character')(models, log));
    // app.use('/messages', require('./routes/message')(models, log));
    app.use('/races', auth, require('./routes/race')(models,log))
    app.use('/rarity', auth, require('./routes/rarity_item')(models));
    // app.use('/sessions', require('./routes/room')(models, log));
    app.use('/rooms', auth, require('./routes/room')(models, log));
    app.use('/roomcharacters', auth, require('./routes/room_character')(models, log));
    app.use('/skills', auth, require('./routes/skill')(models, log));
    // app.use('/type', require('./routes/type_item')(models))
    app.use('/dice', auth, require('./routes/dice')(models, log));
    app.use('/logs', auth, require('./routes/log')(models));

}



module.exports = { init };