const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    'new_db',
    'user1',
    'root',
    {
    host: 'localhost',
    dialect: 'postgres'
    })

const User = sequelize.define(
    'User',
    {
        // Здесь определяются атрибуты модели
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            // allowNull по умолчанию имеет значение true
        },
    },
    {
        // Здесь определяются другие настройки модели
    }
)
const Place = sequelize.define(
    'Post',
    {
        // Здесь определяются атрибуты модели
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            // allowNull по умолчанию имеет значение true
        }
    },
    {
        // Здесь определяются другие настройки модели
    }
)
const UserPosts = sequelize.define('User_Post',{
    visited: DataTypes.BOOLEAN
})


User.belongsToMany(Place, { through: 'User_Post' })
Place.belongsToMany(User, { through: 'User_Post' })


sequelize.sync({ force: true })

console.log(User === sequelize.models.User)