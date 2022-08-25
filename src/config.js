require("dotenv").config();

module.exports = {
    port: process.env.PORT || 8888,
    phrase: process.env.TOKEN_PHRASE,
};
