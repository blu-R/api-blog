const userControllers = require("./users.controllers");
const postControllers = require("../posts/posts.controllers");

const getAll = (req, res) => {
    const data = userControllers.getAllUsers();
    res.status(200).json({ items: data.length, users: data });
};

const getById = (req, res) => {
    const id = req.params.id;
    const data = userControllers.getUserById(id);

    if (data) {
        res.status(200).json(data);
    } else {
        res.status(404).json({ message: `User with ID ${id} not found` });
    }
};

const register = (req, res) => {
    const user = req.body;
    if (!Object.keys(user).length) {
        return res.status(400).json({ message: "Missing data" });
    } else if (
        !user.first_name ||
        !user.last_name ||
        !user.email ||
        !user.password ||
        !user.birthday_date ||
        !user.country
    ) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                first_name: "string",
                last_name: "string",
                email: "example@example.com",
                password: "string",
                birthday_date: "DD/MM/YY",
                country: "string",
            },
        });
    } else {
        const data = userControllers.createUser(user);
        return res.status(201).json({
            message: `User created succesfully with id: ${data.id}`,
            user: data,
        });
    }
};

const edit = (req, res) => {
    const id = req.params.id;
    const user = req.body;

    if (!Object.keys(user).length) {
        return res.status(400).json({ message: "Missing data" });
    } else if (
        !user.first_name ||
        !user.last_name ||
        !user.email ||
        !user.phone ||
        !user.rol ||
        !user.profile_image ||
        !user.birthday_date ||
        !user.country ||
        !user.is_active
    ) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                first_name: "string",
                last_name: "string",
                email: "example@example.com",
                phone: "+51646461616",
                rol: "normal",
                profile_image: "exampli.com/img/example.png",
                birthday_date: "DD/MM/YYYY",
                country: "string",
                is_active: true,
            },
        });
    } else {
        const data = userControllers.editUser(id, user);
        return res.status(200).json({
            message: `User data edited succesfully`,
            user: data,
        });
    }
};

const remove = (req, res) => {
    const id = req.params.id;
    const data = userControllers.deleteUser(id);
    return data
        ? res.status(204).json() //? 204 no permite retornar algo, el json nos permite indicar que alli termina la respuesta.
        : res.status(400).json({ message: "Invalid Id" });
};

const getMyUser = (req, res) => {
    const id = req.user.id;
    const data = userControllers.getUserById(id);

    if (data) {
        res.status(200).json(data);
    } else {
        res.status(404).json({ message: `User not found` });
    }
};

const editMyUser = (req, res) => {
    const id = req.user.id;
    const user = req.body;

    if (!Object.keys(user).length) {
        return res.status(400).json({ message: "Missing data" });
    } else if (
        !user.first_name ||
        !user.last_name ||
        !user.email ||
        !user.phone ||
        !user.profile_image ||
        !user.birthday_date ||
        !user.country ||
        !user.is_active
    ) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                first_name: "string",
                last_name: "string",
                email: "example@example.com",
                phone: "+51646461616",
                profile_image: "exampli.com/img/example.png",
                birthday_date: "DD/MM/YYYY",
                country: "string",
                is_active: true,
            },
        });
    } else {
        const data = userControllers.editUser(id, user);
        return res.status(200).json({
            message: `User data edited succesfully`,
            user: data,
        });
    }
};

const removeMyUser = (req, res) => {
    const id = req.user.id;
    const data = userControllers.deleteUser(id);
    return data
        ? res.status(204).json() //? 204 no permite retornar algo, el json nos permite indicar que alli termina la respuesta.
        : res.status(400).json({ message: "Invalid Id" });
};

const getMyPosts = (req, res) => {
    const userId = req.user.id;
    const data = postControllers.getAllPostsByUser(userId);
    return res.status(200).json({ items: data.length, posts: data });
};

const getMyPostById = (req, res) => {
    const userId = req.user.id;
    const postId = req.params.id;

    const data = postControllers.getPostById(postId);

    if (data) {
        return data.user_id === userId
            ? res.status(200).json(data)
            : res.status(403).json({ message: "Forbidden" });
    } else {
        return res.status(404).json({ message: "Post not found" });
    }
};

const editMyPost = (req, res) => {
    const userId = req.user.id;
    const post = req.body;
    const postId = req.params.id;

    const data = postControllers.getPostById(postId);

    if (data) {
        if (data.user_id === userId) {
            if (!Object.keys(post).length) {
                return res.status(400).json({ message: "Missing data" });
            } else if (!post.title || !post.content || !post.header_image) {
                return res.status(400).json({
                    message: "All fields must be completed",
                    fields: {
                        title: "string",
                        content: "string",
                        header_image: "url_to_img",
                    },
                });
            } else {
                const editedPost = { user_id: userId, ...post };
                const response = postControllers.editPost(postId, editedPost);
                return res.status(200).json({
                    message: "Post edited succesfully",
                    post: response,
                });
            }
        } else {
            return res.status(403).json({ message: "Forbidden" });
        }
    } else {
        return res.status(404).json({ message: "Post not found" });
    }
};

const deleteMyPost = (req, res) => {
    const userId = req.user.id;
    const postId = req.params.id;

    const data = postControllers.getPostById(postId);

    if (data) {
        if (data.user_id === userId) {
            postControllers.deletePost(postId);
            return res.status(204).json(); //? 204 no permite retornar algo, el json nos permite indicar que alli termina la respuesta.
        } else {
            return res.status(403).json({ message: "Forbidden" });
        }
    } else {
        return res.status(404).json({ message: "Invalid ID" });
    }
};

module.exports = {
    getAll,
    getById,
    register,
    edit,
    remove,
    getMyUser,
    editMyUser,
    removeMyUser,
    getMyPosts,
    getMyPostById,
    editMyPost,
    deleteMyPost,
};
