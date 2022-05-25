module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("users", {
        title: {
            type: Sequelize.STRING
        },
        subtitle: {
            type: Sequelize.STRING
        },
        text: {
            type: Sequelize.STRING
        }
    });
    return Post;
};