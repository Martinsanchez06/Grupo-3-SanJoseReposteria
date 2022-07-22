const fs = require('fs');
const path = require('path');
const productsFilePath = path.join('data', 'products.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
        let rutaProducts = path.join('data', 'products.json');
        let producto = {
            nombre: req.body.name,
            precio: req.body.price,
            tamaño: req.body.size,
            descripcion: req.body.description
        }
        let archivoproducto = fs.readFileSync(rutaProducts, { encoding: 'utf-8' });
        let productos;
        if (archivoproducto == '') {
            productos = [];
        } else {
            productos = JSON.parse(archivoproducto);
        }
        productos.push(producto);
        productosJSON = JSON.stringify(productos);
        fs.writeFileSync(rutaProducts, productosJSON);
        res.redirect('/productos/lista');
    },

    list: (req, res) => {
        res.render("listadoProductos", { "productos": productos });
    },
    singleDetail: (req, res) => {
        let productoEncontrado = productos.find(products => products.id === req.params.id);
        res.render("detail", { "productos": 
        {
            "id": productoEncontrado.id,
            "nombre": productoEncontrado.nombre,
            "categoria": productoEncontrado.categoria,
            "precio": productoEncontrado.precio,
            "imagen1": "",
            "imagen2": "",
            "imagen3": "",
            "tamaño": productoEncontrado.tamaño,
            "descripcion": productoEncontrado.descripcion,
           } });
    },
    editarFormulario: (req, res) => {
        let productoEncontrado = productos.find(products => products.id === req.params.id);
        res.render("editarProduct", { "productos": 
        {
            "id": productoEncontrado.id,
            "nombre": productoEncontrado.nombre,
            "categoria": productoEncontrado.categoria,
            "precio": productoEncontrado.precio,
            "imagen1": "",
            "imagen2": "",
            "imagen3": "",
            "tamaño": productoEncontrado.tamaño,
            "descripcion": productoEncontrado.descripcion,
           } });
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

        console.log(req.body)
        res.render('listadoProductos' , { "productos": productos })
    },
    delete: (req, res) => {
        let id = req.params.id;
        let finalProducts = productos.filter(product => product.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
        res.redirect('/productos/lista')
        console.log(req.params.id);
        console.log(productos)
    }
};

module.exports = productController;