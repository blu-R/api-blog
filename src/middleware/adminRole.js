const roleAdminMiddleware = (req, res, next) => {
    const role = req.user.rol;
    if (role === "admin") {
        next();
    } else {
        return res
            .status(401)
            .json({ status: "error", message: "User not authorized" });
    }
};

module.exports = {
    roleAdminMiddleware,
};
