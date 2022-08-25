const { request } = require('express');
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require("../src/database/models"); 


const productController = {

    detail: function (req, res) {
        res.render("productdetail");
    },
    carritoCompras: (req, res) => {
        db.Usuario.findAll()
        .then(function (usuarios) {
            res.render("carritoDeCompras", { usuarios })
        })
    },
    create: (req, res) => {
        res.render("createProduct")
    },
    guardar: (req, res) => {
        db.Producto.create({
            nombre: req.body.nombre,
            imagen_1: req.body.imagen1,
            imagen_2:req.body.imagen2,
            imagen_3:req.body.imagen3,
            categoria: req.body.categoria,
            precio:req.body.precio,
            descripcion: req.body.descripcion
        })

        res.redirect("/productos/lista");
    },

    list: (req, res) => {
        db.Producto.findAll()
        .then(function (productos) {
            res.render("listadoProductos", { productos: productos })
        })

    },
    singleDetail: (req, res) => {
        db.Producto.findByPk(req.params.id)
        .then(function (productos) {
            res.render("detail", { productos })
        })
    },
    editarFormulario: (req, res) => {
        let productoEncontrado = productos.find(products => products.id === req.params.id);
        res.render("editarProduct", { "productos": productoEncontrado });
    },
    editar: (req, res) => {
        let idProduct = req.params.id
        let products = productos;
        let productToEdit = products.findIndex(product => product.id === idProduct);
        if (req.method === 'PUT') {
            const data = req.body;
            products[productToEdit] = { ...products[productToEdit], ...data }
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        }

        res.render('listadoProductos', { "productos": productos })
    },
    delete: (req, res) => {
        let id = req.params.id;
        let finalProducts = productos.filter(product => product.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
        res.render('listadoProductos', { "productos": productos })
    }
};

module.exports = productController;