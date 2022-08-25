const postControllers = require("./posts.controllers");

const getAll = (req, res) => {
    const data = postControllers.getAllPosts();
    return res.status(200).json({ items: data.length, posts: data });
};

const getById = (req, res) => {
    const id = req.params.id;
    const data = postControllers.getPostById(id);
    return data
        ? res.status(200).json(data)
        : res.status(404).json({ message: "Post not found" });
};

const create = (req, res) => {
    const userId = req.user.id;
    const post = req.body;

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
        const newPost = { user_id: userId, ...post };
        const data = postControllers.createPost(newPost);
        return res
            .status(201)
            .json({ message: "Post created succesfully", post: data });
    }
};

module.exports = {
    getAll,
    getById,
    create,
};
