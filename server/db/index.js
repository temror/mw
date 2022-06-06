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
db.place = require("./models/place.model")(sequelize, Sequelize);
db.image = require("./models/image.model")(sequelize, Sequelize);
db.user = require("./models/user.model")(sequelize, Sequelize);
db.role = require("./models/role.model")(sequelize, Sequelize);
db.station = require("./models/station.model")(sequelize, Sequelize);
db.metrocolor = require("./models/metrocolor.model")(sequelize, Sequelize);
db.user_place = require("./models/user_place.model")(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.place.belongsToMany(db.user, {
    through: "user_place"
});
db.user.belongsToMany(db.place, {
    through: "user_place"
});

db.place.belongsToMany(db.station, {
    through: "place_stations"
});
db.station.belongsToMany(db.place, {
    through: "place_stations"
});

db.ROLES = ["user", "admin"];

db.place.hasMany(db.image)
db.image.belongsTo(db.place)

db.metrocolor.hasMany(db.station)
db.station.belongsTo(db.metrocolor)

module.exports = db
