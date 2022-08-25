const router = require("express").Router();

const passport = require("passport");
require("../middleware/auth.middleware")(passport);

const userServices = require("./users.http");

router
    .route("/") //? /api/v1/users
    .get(userServices.getAll)
    .post(userServices.register);

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
    .get(passport.authenticate("jwt", { session: false }), userServices.getById)
    .put(userServices.edit)
    .delete(userServices.remove);

exports.router = router;
