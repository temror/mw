module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'Image',
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