module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'user_place',
        {
            visited: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            }
        },
        {
            timestamps: false,
        }
    );
};
