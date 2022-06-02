module.exports = {
    HOST: "localhost",
    USER: "user1",
    PASSWORD: "root",
    DB: "testdb",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};