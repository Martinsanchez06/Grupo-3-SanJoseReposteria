const express = require("express");
const session = require("express-session");
const cookies = require("cookie-parser");
const cors = require("cors");
const rutasMain = require("./routers/main");
const rutasProductos = require("./routers/productos");
const rutasUser = require("./routers/user");
const apiProductsRouter = require("./routers/api/apiProductsRouter");
const apiUsuariosRouter= require("./routers/api/apiUsuariosRouter")
const path = require("path");
const methodOverride = require("method-override");
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");
const app = express();

// -------MOTOR DE VISTAS EJS-------
app.set("view engine", "ejs");
app.set("views", "./views");

// -------PUERTO DEL SERVIDOR--------
const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`listening on port ${port}`);
});

// --------MIDLEWARES--------
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static("public"));
app.use(session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
}));

app.use(cookies());
app.use(userLoggedMiddleware);

//---------RUTAS API-----------

app.use("/api", apiProductsRouter);
app.use("/api", apiUsuariosRouter);

// --------RUTAS A USAR--------

app.use("/", rutasMain);
app.use("/productos", rutasProductos);
app.use("/user", rutasUser);







