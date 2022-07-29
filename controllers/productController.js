const { request } = require('express');
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productController = {

    detail: function (req, res) {
        res.render("productdetail");
    },
    carritoCompras: (req, res) => {
        res.render("carritoDeCompras")
    },
    create: (req, res) => {
        res.render("createProduct")
    },
    guardar: (req, res) => {
        let rutaProducts = path.join(__dirname, '../data/products.json');
        let productoGuardado = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            tamaño: req.body.tamaño,
            descripcion: req.body.descripcion
        };
        let archivoproducto = fs.readFileSync(rutaProducts, { encoding: 'utf-8' });
        let productos;
        if (archivoproducto == '') {
            productos = [];
        } else {
            productos = JSON.parse(archivoproducto);
        }
        productos.push(productoGuardado);
        productosJSON = JSON.stringify(productos, null, ' ');
        fs.writeFileSync(rutaProducts, productosJSON);
        res.redirect('/productos/lista');
    },

    list: (req, res) => {
        res.render("listadoProductos", { "productos": productos });
    },
    singleDetail: (req, res) => {
        let productoEncontrado = productos.find(products => products.id === req.params.id);
         res.render("detail", { "productos": productoEncontrado})
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

        res.render('listadoProductos' , { "productos": productos })
    },
    delete: (req, res) => {
        let id = req.params.id;
        let finalProducts = productos.filter(product => product.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
        res.render('listadoProductos' , { "productos": productos })
    }
};

module.exports = productController;