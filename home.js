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
    res.sendFile(path.join(__dirname, "./views/registro.html"))
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/login.html"))
});

// Holi soy Camila
