module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'Place',
        {
            // Здесь определяются атрибуты модели
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            text: {
                type: Sequelize.TEXT,
                // allowNull по умолчанию имеет значение true
            }
        },
        {
            timestamps: false,
        }
    );
};