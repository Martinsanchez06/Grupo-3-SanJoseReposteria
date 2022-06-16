const express = require("express");
const rutasMain = require("./routers/main");
const rutasProductos = require("./routers/productos");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

app.listen(process.env.PORT || 3000, () => {
    console.log("Proceso exitoso");
});

app.use("/", rutasMain);
app.use("/productos", rutasProductos);









