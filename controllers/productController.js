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

        let archivoJSONEdit = fs.readFileSync('data/products.json', {encoding: 'utf-8'})

        let product = JSON.parse(archivoJSONEdit);

        let productToEdit = product[idProduct];

        res.render("editarProduct", {productToEdit: productToEdit})
    },
    list: (req, res) => {

        //let archivoJSON = fs.readFileSync("prodcutos.json", { encoding: "utf-8" });

        //let productos = JSON.parse(archivoJSON);

        //{"productos": productos}

        res.render("listadoProductos");
    }
};

module.exports = productController;