module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'User_Places',
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