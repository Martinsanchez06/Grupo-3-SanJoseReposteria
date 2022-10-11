const db = require("../../src/database/models");


const apiProductsController = {
    getAllProducts: async (req, res) => {

        try {
            const productsFromDB = await db.Producto.findAll({ include: {association: "categorias"}});

            const totalProducts = productsFromDB.length;

            const productsDetail = productsFromDB.map(product => {
                return {
                    id: product.idProductos,
                    name: product.nombre,
                    description: product.descripcion,
                    category: product.categoria_id,
                    detail: `http://localhost:3000/productos/productdetail/${product.idProductos}`
                }
            });

            if (productsFromDB) {
                res.status(200).json({
                    "count": totalProducts,
                    "data": productsDetail,
                    "status": 200,
                    "msg": "Melo",
                    "endPoint": "/api/",
                })
            } else {
                res.status(500).json({"msg": "500- Ocurrio un error"});
            }

        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = apiProductsController;