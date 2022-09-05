const { Sequelize } = require("sequelize");

const db = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "p0llit0",
    database: "blogTemp",
    port: 5432,
});

module.exports = {
    db,
};
