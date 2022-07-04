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
    editar: (req, res) => {
        let idProduct = req.params.idProduct

        let product = [
            {id: 1 , name: "Pastel"},
            {id: 2 , name: "torta"},
            {id: 3 , name: "torta de cumpleaños"}
        ]

        let productToEdit = product[idProduct];

        res.render("editarProduct", {productToEdit: productToEdit})
    }
};

module.exports = productController;