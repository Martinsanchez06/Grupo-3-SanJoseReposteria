const { validationResult } = require('express-validator')
const { request } = require('express');
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require("../src/database/models");
const Op = db.Sequelize.Op;


const productController = {

    detail: function (req, res) {
        const productByPk =  db.Producto.findByPk(req.params.id, {
            include: [{ association: 'categorias' }]
        });

        const allProducts = db.Producto.findAll(
            {
                include: [{ association: 'categorias' }],
                where: {
                    idProductos: {
                        [Op.ne]: req.params.id
                    }
                }
                
            },
            
        );
        Promise.all([productByPk, allProducts])
        .then(function ([productByPk, products]) {
            res.render("productdetail", { productByPk, products });
        })
    },
    carritoCompras: (req, res) => {
        db.Producto.findAll()
            .then(function (productos) {
                res.render("carritoDeCompras", { productos })
            })
    },

    create: (req, res) => {
        let productoEncontrado = db.Producto.findAll()
        let categoriaDelProducto = db.Categoria.findAll();
        Promise.all([productoEncontrado, categoriaDelProducto])
            .then(function ([productos, categorias]) {
                res.render("createProduct", { productos, categorias });
            })
    },
    guardar: (req, res) => {

        const resultadoValidacion = validationResult(req)

        console.log(resultadoValidacion.mapped());

        if (resultadoValidacion.errors.length > 0) {
            let productoEncontrado = db.Producto.findAll()
            let categoriaDelProducto = db.Categoria.findAll();
            Promise.all([productoEncontrado, categoriaDelProducto])
                .then(function ([productos, categorias]) {
                    res.render("createProduct", {
                        productos, categorias, errors: resultadoValidacion.mapped(),
                        datosAntiguos: req.body
                    });
                })
        }

        let errors = validationResult(req)
        try {
            db.Producto.create({
                nombre: req.body.nombre,
                imagen_1: req.files[0].filename,
                imagen_2: req.files[1].filename,
                imagen_3: req.files[2].filename,
                tamaño: req.body.tamanio,
                categoria_id: req.body.categoria,
                precio: req.body.precio,
                descripcion: req.body.descripcion
            })
            res.redirect("/productos/lista");
            console.log(req.body, req.file)

        } catch (error) {
            if (errors) {
                let productoEncontrado = db.Producto.findAll()
                let categoriaDelProducto = db.Categoria.findAll();
                Promise.all([productoEncontrado, categoriaDelProducto])
                    .then(function ([productos, categorias]) {
                        res.render("createProduct", { productos, categorias });
                    })
                console.log(errors);
            }
        }

    },

    list: (req, res) => {
        db.Producto.findAll()
            .then(function (productos) {
                res.render("listadoProductos", { productos: productos })
            })

    },
    singleDetail: (req, res) => {
        db.Producto.findByPk(req.params.id, {
            include: [{ association: 'categorias' }]
        })
            .then(function (productos) {
                res.render("detail", { productos })
            })
    },
    editarFormulario: (req, res) => {
        let productoEncontrado = db.Producto.findByPk(req.params.id)
        let categoriaDelProducto = db.Categoria.findAll();
        Promise.all([productoEncontrado, categoriaDelProducto])
            .then(function ([productos, categorias]) {
                res.render("editarProduct", { productos, categorias });
            })
    },
    editar: (req, res) => {
        db.Producto.update({
            nombre: req.body.nombre,
            imagen_1: req.files[0] ? req.files[0].filename : req.body.oldImagen1,
            imagen_2: req.files[1] ? req.files[1].filename : req.body.oldImagen2,
            imagen_3: req.files[2] ? req.files[2].filename : req.body.oldImagen3,
            tamaño: req.body.tamanio,
            categoria_id: req.body.categoria,
            precio: req.body.precio,
            descripcion: req.body.descripcion
        }, {
            where: {
                idProductos: req.params.id,
            }
        })
        console.log(req.body, req.files)
        db.Producto.findAll()
            .then(function (productos) {
                res.render("listadoProductos", { productos: productos })
            })
    },
    delete: (req, res) => {

        db.Producto.destroy({
            where: {
                idProductos: req.params.id
            }
        })
        db.Producto.findAll()
            .then(function (productos) {
                return  res.render("listadoProductos", { productos })
            })


    },
    search: (req, res) => {

        db.Producto.findAll({
            include: [{ association: 'categorias' }],
            where: {
                nombre: { [Op.like]: `%${req.query.search}%` }
            }
        })
            .then(productos => { res.render("resultadoSearch", { productos }); })
            .catch(error => res.send(error))
    }
};

module.exports = productController; 