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
        let productoEncontrado = db.Producto.findAll()
        let categoriaDelProducto = db.Categoria.findAll();
        Promise.all([productoEncontrado, categoriaDelProducto])
        .then(function([productos, categorias ]){
        res.render("createProduct", { productos, categorias });
        })
        },
        guardar: (req, res) => {
        db.Producto.create({
        nombre: req.body.nombre,
        imagen_1: req.body.imagen1,
        imagen_2:req.body.imagen2,
        imagen_3:req.body.imagen3,
        tamaño: req.body.tamaño,
        categoria_id: req.body.categoria,
        precio:req.body.precio,
        descripcion: req.body.descripcion
        })
        
        res.redirect("/productos/lista");
        console.log(req.body)
        },
    },


    singleDetail: (req, res) => {
        db.Producto.findByPk(req.params.id, {
            include : [{association: 'categorias'}]
        })
        .then(function (productos) {
            res.render("detail", { productos })
        })
    },
    editarFormulario: (req, res) => {
        let productoEncontrado = db.Producto.findByPk(req.params.id)
        let categoriaDelProducto = db.Categoria.findAll();
        Promise.all([productoEncontrado, categoriaDelProducto])
        .then(function([productos, categorias ]){
            res.render("editarProduct", { productos, categorias }); 
        })
    },
    editar: (req, res) => {
        db.Producto.update({
            nombre: req.body.nombre,
            imagen_1: req.body.imagen1,
            imagen_2:req.body.imagen2,
            imagen_3:req.body.imagen3,
            categoria_id: req.body.categoria, module.exports = productController;,
            precio:req.body.precio,
            descripcion: req.body.descripcion
        }, {
            where : {
                idProductos: req.params.id,
            }
        })


        res.render('listadoProductos', { "productos": productos })
    },
    delete: (req, res) => {
        db.Producto.destroy({ 
            where : { idProductos: req.params.id }
         })
        res.render('listadoProductos', { "productos": productos })
    }
};

// module.exports = productController;


