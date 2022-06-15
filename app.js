const express = require("express");

const path = require("path");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.listen(port, () =>{
    console.log(`listening on port ${port}`)
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/home.html"))
});

app.get("/registro", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/registro.html")) 
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/login.html"))
});

app.get("/productdetail", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/productdetail.html"))
});

app.get("/carritoDeCompras", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/carritoDeCompras.html"))
});

app.get("/carritoDeCompras/:id", (req, res) => {
    let idCarritoDeCompras = req.params.id;
    res.send('lo hiciste y estas en el id ' + idCarritoDeCompras)
});