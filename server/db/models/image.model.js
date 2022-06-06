module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'image',
        {
            image: {
                type: Sequelize.BLOB('long')
            }
        },
        {
            timestamps: false,
        }
    );
};
