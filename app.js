const express = require("express");
const rutasMain = require("./routers/main");
const rutasProductos = require("./routers/productos");
const rutasUser = require("./routers/user");
const path = require("path");
//const methodOverride = require("method-override");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

const port = process.env.PORT || 3000;

//app.use(methodOverride('_method'));
app.use(express.static("public"));

app.listen(port, () =>{
    console.log(`listening on port ${port}`);
});

app.use("/", rutasMain);
app.use("/productos", rutasProductos);
app.use("/user", rutasUser);







