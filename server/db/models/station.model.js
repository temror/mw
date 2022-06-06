module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'station',
        {
            // Здесь определяются атрибуты модели
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        },
        {
            timestamps: false,
        }
    );
};
