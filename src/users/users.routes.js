const router = require("express").Router();

const passport = require("passport");
const { roleAdminMiddleware } = require("../middleware/adminRole");
require("../middleware/auth.middleware")(passport);

const userServices = require("./users.http");

router
    .route("/") //? /api/v1/users
    .get(userServices.getAll);

router
    .route("/me")
    .get(
        passport.authenticate("jwt", { session: false }),
        userServices.getMyUser
    )
    .put(
        passport.authenticate("jwt", { session: false }),
        userServices.editMyUser
    )
    .delete(
        passport.authenticate("jwt", { session: false }),
        userServices.removeMyUser
    );

router.get(
    "/me/posts",
    passport.authenticate("jwt", { session: false }),
    userServices.getMyPosts
);

router
    .route("/me/posts/:id")
    .get(
        passport.authenticate("jwt", { session: false }),
        userServices.getMyPostById
    )
    .put(
        passport.authenticate("jwt", { session: false }),
        userServices.editMyPost
    )
    .delete(
        passport.authenticate("jwt", { session: false }),
        userServices.deleteMyPost
    );

router
    .route("/:id")
    .get(userServices.getById)
    .put(
        passport.authenticate("jwt", { session: false }),
        roleAdminMiddleware,
        userServices.edit
    )
    .delete(
        passport.authenticate("jwt", { session: false }),
        roleAdminMiddleware,
        userServices.remove
    );

exports.router = router;
