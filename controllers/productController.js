const fs= require('fs');
const path=require('path');

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
    guardar: (req,res) => {
        
        let rutaProducts= path.join('data','products.json');

        let producto = {
            nombre: req.body.name,
            precio: req.body.price,
            tamaño: req.body.size,
            descripcion: req.body.description
        }

        let archivoproducto = fs.readFileSync(rutaProducts, {encoding:'utf-8'});

        let productos;

        if (archivoproducto == '') {

            productos=[];

        } else {

            productos=JSON.parse(archivoproducto);
        }

        productos.push(producto);

        productosJSON= JSON.stringify(productos);

        fs.writeFileSync(rutaProducts, productosJSON);

        res.redirect('/productos/lista');


    },
    editar: (req, res) => {
        let idProduct = req.params.idProduct

        let product = [
            {id: 1 , name: "Pastel"},
            {id: 2 , name: "torta"},
            {id: 3 , name: "torta de cumpleaños"}
        ]

        let productToEdit = product[idProduct];

        res.render("editarProduct", {productToEdit: productToEdit})
    },
    list: (req, res) => {

        let rutaProducts = path.join('data','products.json');

        let archivoJSON = fs.readFileSync(rutaProducts, { encoding: "utf-8" });

        let productos = JSON.parse(archivoJSON);

        //{"productos": productos}

        res.render("listadoProductos", {"productos": productos});
    },
    singleDetail: (req, res) => {

        let rutaProducts = path.join('data','products.json');

        let archivoJSON = fs.readFileSync(rutaProducts, { encoding: "utf-8" });

        let productos = JSON.parse(archivoJSON);

        res.render("detail", {"productos": productos});
    },
};

module.exports = productController;