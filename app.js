const express = require("express");
const rutasMain = require("./routers/main");
const rutasProductos = require("./routers/productos");
const rutasUser = require("./routers/user");
const path = require("path");
const methodOverride = require("method-override");
const app = express();

// -------MOTOR DE EJS-------
app.set("view engine", "ejs");
app.set("views", "./views");

// -------PUERTO DEL SERVIDOR--------
const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`listening on port ${port}`);
});

// --------CONFIGURACIONES--------

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static("public"));

// --------RUTAS A USAR--------

app.use("/", rutasMain);
app.use("/productos", rutasProductos);
app.use("/user", rutasUser);







