//* Dependencias
const express = require("express");
const passport = require("passport");
require("./middleware/auth.middleware")(passport);

//* Variables de entorno
const { port } = require("./config");

//* Archivos
const userRouter = require("./users/users.routes").router;
const authRouter = require("./auth/auth.routes").router;
const postRouter = require("./posts/posts.routes").router;

//* Configuraciones iniciales
const app = express();

//? Esta configuración es para habilitar el req.body
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ message: "All ok" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);

app.get(
    "/ejemplo",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.status(200).json({
            message: "credenciales",
            email: req.user.email,
        });
    }
);

app.listen(port, () => {
    console.log(`Server Kame House started at port ${port}`);
});
