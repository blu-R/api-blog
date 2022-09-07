const { db, DataTypes } = require("../utils/database.util");

const Users = db.define("users", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    first_name: {
        allowNull: false,
        type: DataTypes.STRING(35),
        validate: {
            len: [2, 35],
        },
    },
    last_name: {
        allowNull: false,
        type: DataTypes.STRING(45),
        validate: {
            len: [2, 45],
        },
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
        validate: {
            len: [10, 15],
        },
    },
    birthday_date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "normal",
    },
    profile_image: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true,
        },
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            len: [2, 2],
        },
    },
    is_active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    verified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Users;
