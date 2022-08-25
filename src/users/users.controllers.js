const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

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
    return usersDB;
    //? select * from users;
};

const getUserById = id => {
    const data = usersDB.filter(item => item.id === id);
    return data.length ? data[0] : false;
    //? select * from users where id = ${id};
};

const createUser = data => {
    const newUser = {
        id: uuid.v4(), // obligatorio y único
        first_name: data.first_name, // obligatorio
        last_name: data.last_name, // obligatorio
        email: data.email, //obligatorio y único
        password: hashPassword(data.password), // obligatorio
        phone: data.phone ? data.phone : "", // único
        birthday_date: data.birthday_date, // obligatorio
        rol: "normal", // obligatorio y por defecto "normal"
        profile_image: data.profile_image ? data.profile_image : "",
        country: data.country, // obligatorio
        is_active: true, // obligatorio y por defecto true
        verified: false, //obligatorio y por defecto false
    };
    usersDB.push(newUser);
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

const deleteUser = id => {
    const index = usersDB.findIndex(user => user.id === id);
    if (index !== -1) {
        usersDB.splice(index, 1);
        return true;
    } else {
        return false;
    }
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