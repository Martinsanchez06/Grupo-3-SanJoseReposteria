const fs = require('fs');
const path = require('path');

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

        let rutaProducts = path.join('data', 'products.json');

        let archivoJSON = fs.readFileSync(rutaProducts, { encoding: "utf-8" });

        let productos = JSON.parse(archivoJSON);

        // {"productos": productos}

        res.render("listadoProductos", { "productos": productos });
    },
    singleDetail: (req, res) => {

        let rutaProducts = path.join('data', 'products.json');

        let archivoJSON = fs.readFileSync(rutaProducts, { encoding: "utf-8" });

        let productos = JSON.parse(archivoJSON);

        res.render("detail", { "productos": productos });
    },
    editar: (req, res) => {
        let idProduct = req.params.id

        let rutaEdit = path.join('data', 'products.json')

        let archivoJSONEdit = fs.readFileSync(rutaEdit, { encoding: 'utf-8' })

        let products = JSON.parse(archivoJSONEdit);

        let productToEdit = products.findIndex(product => product.id === idProduct);

        if (req.method === 'PUT') {

            const data = req.body;

            console.log(req.body)

            products[productToEdit] = { ...products[productToEdit], ...data }

            fs.writeFileSync(rutaEdit, JSON.stringify(products));
        }

        res.render("editarProduct", { 'product': products[productToEdit] })
    },
    delete: (req, res) => {
        let rutaEdit = path.join(__dirname, '../data/products.json');

        let archivoJSONEdit = fs.readFileSync(rutaEdit, { encoding: 'utf-8' })

        let products = JSON.parse(archivoJSONEdit);

        if (req.method === 'DELETE') {

            let productoAEncontrar = products.find(products => products.id === req.body.id)

            products.splice(products.indexOf(productoAEncontrar));

            let productsJSON = JSON.stringify(products, null, ' ')

            fs.writeFileSync(rutaEdit, productsJSON);

            console.log(req.body[1] + '1');

            console.log(res.body + '2');


            res.redirect('/productos/lista')
        }
    }
};

module.exports = productController;