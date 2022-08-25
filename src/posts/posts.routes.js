const router = require("express").Router();

const passport = require("passport");
const postServices = require("./posts.http");

router
    .route("/")
    .get(postServices.getAll)
    .post(
        passport.authenticate("jwt", { session: false }),
        postServices.create
    );

router.get("/:id", postServices.getById);

exports.router = router;
