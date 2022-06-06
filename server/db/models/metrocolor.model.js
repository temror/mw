module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'metrocolor',
        {
            // Здесь определяются атрибуты модели
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            color: {
                type: Sequelize.STRING,
                allowNull: false
            },
            number:{
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            timestamps: false,
        }
    );
};
