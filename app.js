const express = require("express");
const rutasMain = require("./routers/main");
const rutasProductos = require("./routers/productos");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.listen(port, () =>{
    console.log(`listening on port ${port}`);
});

app.use("/", rutasMain);
app.use("/productos", rutasProductos);








