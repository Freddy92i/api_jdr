
const { Sequelize } = require('sequelize');
const { UserSchema } = require('./models/user');
const { CharacterSchema } = require('./models/character');
const { ItemSchema } = require('./models/item');
const { SkillSchema } = require('./models/skill');
const { ClassSchema } = require('./models/class');
const { RaceSchema } = require('./models/race');
const { SessionSchema } = require('./models/session');
const { TypeItemSchema } = require('./models/type_item');
const { RarityItemSchema } = require('./models/rarity_item');
const { RoomSchema } = require('./models/room');
const { MessageSchema } = require('./models/message');
const { LogSchema } = require('./models/log');

const {
    env: {
        MYSQL_HOST = 'localhost',
        MYSQL_USER = 'root',
        MYSQL_PASSWORD = '',
        MYSQL_DATABASE = 'jdrppetest'
    }
} = process;

async function setup() {
    const sequelize = new Sequelize(
        MYSQL_DATABASE, 
        MYSQL_USER, 
        MYSQL_PASSWORD, 
        {
            host: MYSQL_HOST,
            dialect: 'mysql'
        }
    );

    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Importation des schémas
    const User = sequelize.define('User', UserSchema);
    const Character = sequelize.define('Character', CharacterSchema);
    const Item = sequelize.define('Item', ItemSchema);
    const Skill = sequelize.define('Skill', SkillSchema);
    const Class = sequelize.define('Class', ClassSchema);
    const Race = sequelize.define('Race', RaceSchema);
    const Session = sequelize.define('Session', SessionSchema);
    const TypeItem = sequelize.define('TypeItem', TypeItemSchema);
    const RarityItem = sequelize.define('RarityItem', RarityItemSchema);
    const Item_Character = sequelize.define('Item_Character', {}, { timestamps: false });
    const Skill_Character = sequelize.define('Skill_Character', {}, { timestamps: false });
    const TypeItem_Item = sequelize.define('TypeItem_Item', {}, { timestamps: false });
    const Message = sequelize.define('Message', MessageSchema);
    const Room = sequelize.define('Room', RoomSchema);
    const Room_Character = sequelize.define('Room_Character', {}, { timestamps: false });
    const Log = sequelize.define('Log', LogSchema);
    const Session_Character = sequelize.define('Session_Character', {}, { timestamps: false });

    
    
    // Définition des relations
    User.hasMany(Character);
    Character.belongsTo(User);
    Character.belongsToMany(Item, { through: Item_Character});
    Item.belongsToMany(Character, { through: Item_Character});
    Character.belongsToMany(Skill, { through: Skill_Character});
    Skill.belongsToMany(Character, { through: Skill_Character});
    Character.belongsTo(Class);
    Class.hasMany(Character);
    Character.belongsTo(Race);
    Race.hasMany(Character);

    Character.belongsToMany(Session, { through: Session_Character});
    Session.belongsToMany(Character, { through: Session_Character});
    
    Item.belongsTo(RarityItem);
    RarityItem.hasMany(Item);
    
    Item.belongsToMany(TypeItem, { through: TypeItem_Item});
    TypeItem.belongsToMany(Item, { through: TypeItem_Item});

    Message.belongsTo(Character);
    Character.hasMany(Message);

    Message.belongsTo(Room);
    Room.hasMany(Message);

    Room.belongsToMany(Character, { through: Room_Character});
    Character.belongsToMany(Room, { through: Room_Character});

    Log.belongsTo(User,{foreignKey : {name : "UserId", allowNull :  true}});
    User.hasMany(Log);


    // On synchronise les modèles
    await Promise.all([
        User.sync(),
        Character.sync(),
        Item.sync(),
        Skill.sync(),
        Class.sync(),
        Race.sync(),
        Session.sync(),
        TypeItem.sync(),
        RarityItem.sync(),
        Item_Character.sync(),
        Skill_Character.sync(),
        TypeItem_Item.sync(),
        Message.sync(),
        Room.sync(),
        Room_Character.sync(),
        Log.sync()
        // la suite ici ;-)
    ]);

    return { 
        User,
        Character,
        Item,
        Skill,
        Class,
        Race,
        Session,
        TypeItem,
        RarityItem,
        Item_Character,
        Skill_Character,
        TypeItem_Item,
        Message,
        Room,
        Room_Character,
        Log

        // la suite ici ;-)
    };
}

module.exports = { setup };