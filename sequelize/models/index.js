const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/User")(sequelize, Sequelize);
db.place = require("../models/Place")(sequelize, Sequelize);
db.user_place = require("../models/User_Places")(sequelize, Sequelize);
db.image = require("../models/Image")(sequelize, Sequelize)

db.place.hasMany(db.image)
db.image.belongsTo(db.place)

module.exports = db