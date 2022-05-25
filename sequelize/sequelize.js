const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    'seq',
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
const Post = sequelize.define(
    'Post',
    {
        // Здесь определяются атрибуты модели
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            // allowNull по умолчанию имеет значение true
        },
    },
    {
        // Здесь определяются другие настройки модели
    }
)

sequelize.sync({ force: true })

console.log(User === sequelize.models.User)