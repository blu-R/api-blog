const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const Users = require("../models/user.model");

const usersDB = [
    {
        id: "774495ba-483b-49c4-b17c-a0a1bfa3796f",
        first_name: "Corco",
        last_name: "Bain",
        email: "corco.bain@acme.com",
        password:
            "$2b$10$.8kQe57PufXmZLeuJOeHSeT2mW58qDwK.cFZUECLPW/DZ8QMq1HXi",
        phone: "+5196432542",
        birthday_date: "02/11/1999",
        rol: "normal",
        profile_image: "",
        country: "PE",
        is_active: true,
        verified: false,
    },
    {
        id: "7dbe219f-9d04-4639-a3b8-0cdb0663306b",
        first_name: "Elsa",
        last_name: "Pito",
        email: "elsa.pito@acme.com",
        password:
            "$2b$10$LuYGioiQwYPvxFkDd6He7u4MEUboeGSdGbmVUUIKHNGrAjJWVOVui",
        phone: "+51962222542",
        birthday_date: "02/05/2002",
        rol: "normal",
        profile_image: "url",
        country: "PE",
        is_active: true,
        verified: false,
    },
];

const getAllUsers = () => {
    const data = Users.findAll();
    return data;
    //? select * from users;
};

const getUserById = id => {
    const data = usersDB.filter(item => item.id === id);
    return data.length ? data[0] : false;
    //? select * from users where id = ${id};
};

const createUser = async data => {
    const newUser = await Users.create({
        id: uuid.v4(),
        password: hashPassword(data.password),
        rol: "normal",
        is_active: true,
        verified: false,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        birthday_date: data.birthday_date,
        country: data.country,
        phone: data.phone ? data.phone : null,
        profile_image: data.profile_image ? data.profile_image : null,
    });

    return newUser;
};

const editUser = (id, data) => {
    const index = usersDB.findIndex(user => user.id === id);
    if (index != -1) {
        usersDB[index] = {
            id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: usersDB[index].password,
            phone: data.phone,
            birthday_date: data.birthday_date,
            rol: data.rol,
            profile_image: data.profile_image,
            country: data.country,
            is_active: data.is_active,
            verified: false,
        };
        return usersDB[index];
    } else {
        return createUser(data);
    }
};

const deleteUser = async id => {
    const data = await Users.destroy({
        where: {
            id,
        },
    });
    return data;
};

const getUserByEmail = email => {
    const data = usersDB.filter(user => user.email === email);
    return data.length ? data[0] : false;
    //? select * from users where email = ${email};
};

// console.log(createUser({ password: "1234" }));

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser,
    getUserByEmail,
};
