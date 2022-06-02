module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'User',
        {
            // Здесь определяются атрибуты модели
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lastName: {
                type: Sequelize.STRING,
                // allowNull по умолчанию имеет значение true
            },
        },
        {
            timestamps: false,
        }
        );
};