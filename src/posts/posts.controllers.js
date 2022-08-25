const uuid = require("uuid");

const postsDB = [
    {
        id: "3c11e768-b096-4689-b92c-51f4af38778a",
        title: "Lorem ipsum - Corco",
        content:
            "In invidunt justo eleifend dolor sanctus aliquyam elitr at duo rebum dolore stet duo dolores. Erat at ut dolor vulputate amet et labore est erat aliquip vel iriure ipsum amet eirmod duo.",
        header_image: "url_to_img",
        user_id: "774495ba-483b-49c4-b17c-a0a1bfa3796f",
        published: true,
    },
    {
        id: "3ab1051c-d8f6-411c-85c0-debc9166dcd4",
        title: "Lorem ipsum - Elsa",
        content:
            "Dolore labore vel amet sed odio erat vel et. Dolore nonummy magna et erat et tempor erat rebum hendrerit feugiat diam. Labore aliquyam amet magna volutpat. Diam ipsum nibh elitr takimata invidunt dolore wisi sanctus et lorem vero.",
        header_image: "url_to_img",
        user_id: "7dbe219f-9d04-4639-a3b8-0cdb0663306b",
        published: true,
    },
];

const getAllPosts = () => {
    return postsDB;
};

const getPostById = id => {
    const post = postsDB.filter(item => item.id === id);
    return post.length ? post[0] : false;
};

const createPost = data => {
    const newPost = {
        id: uuid.v4(),
        title: data.title,
        content: data.content,
        header_image: data.header_image,
        user_id: data.user_id, //Aqui hara referencia al usuario de tu userDB
        published: true,
    };
    postsDB.push(newPost);
    return newPost;
};

const editPost = (id, data) => {
    const index = postsDB.findIndex(post => post.id === id);
    if (index !== -1) {
        postsDB[index] = {
            id,
            title: data.title,
            content: data.content,
            header_image: data.header_image,
            user_id: data.user_id,
            published: true,
        };
        return postsDB[index];
    } else {
        return false;
    }
};

const deletePost = id => {
    const index = postsDB.findIndex(post => post.id === id);
    if (index !== -1) {
        postsDB.splice(index, 1);
        return true;
    } else {
        return false;
    }
};

const getAllPostsByUser = userId => {
    const posts = postsDB.filter(post => post.user_id === userId);
    return posts;
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    editPost,
    deletePost,
    getAllPostsByUser,
};
