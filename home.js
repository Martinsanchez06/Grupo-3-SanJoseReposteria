const express = require("express");

const path = require("path");

const app = express();

app.use(express.static("public"));

app.listen(3000, () => {
    console.log("Proceso exitoso");
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/home.html"))
});

app.get("/registro", (req, res) => {
<<<<<<< HEAD
    res.sendFile(path.join(__dirname, "./views/registro.html")) 
=======
    res.sendFile(path.join(__dirname, "./views/registro.html"))
>>>>>>> b167d3ade22b36372a1bd03c9bea7bface688811
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/login.html"))
});

app.get("/productdetail", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/productdetail.html"))
});
