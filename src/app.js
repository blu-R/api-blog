//* Dependencias
const express = require("express");
const passport = require("passport");
require("./middleware/auth.middleware")(passport);

//* Variables de entorno
const { port } = require("./config");

//* Archivos de rutas
const userRouter = require("./users/users.routes").router;
const authRouter = require("./auth/auth.routes").router;
const postRouter = require("./posts/posts.routes").router;

const { db } = require("./utils/database.util"); //? Sequelize

//* Configuraciones iniciales
const app = express();
app.use(express.json()); //? Esta configuración es para habilitar el req.body

//* Authenticate database credentials
db.authenticate()
    .then(() => console.log("Database Authenticated"))
    .catch(err => console.log(err));

db.sync()
    .then(() => console.log("Database synced succesfully!."))
    .catch(err => console.log(err));

//* Rutas

app.get("/", (req, res) => {
    res.status(200).json({ message: "All ok" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);

app.listen(port, () => {
    console.log(`Server "Kame House" started at port ${port}`);
});
