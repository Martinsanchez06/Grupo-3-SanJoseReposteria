const db = require("../../src/database/models");


const apiProductsController = {
    getAllProducts: async (req, res) => {

        try {
            const productsFromDB = await db.Producto.findAll({ include: { association: "categorias" } });
            
            const categoriasFromDB = await db.Categoria.findAll({
                include : { 
                    all: true,
                    nested: true 
                }
            });

            const totalProducts = productsFromDB.length;

            
            const totalCategorias = categoriasFromDB.map(categoria => {
                const totalDeProductos = productsFromDB.filter(producto => producto.categoria_id === categoria.idCategorias)
                return {
                    categoria: categoria.categoria,
                    productos: totalDeProductos.length,
                }
            })

            const productsDetail = productsFromDB.map(product => {
                return {
                    id: product.idProductos,
                    name: product.nombre,
                    description: product.descripcion,
                    imagen: `https://san-jose-reposteria.herokuapp.com/images/Productos/${product.imagen_1}`,
                    category: product.categoria_id,
                    detail: `https://san-jose-reposteria.herokuapp.com/productos/productdetail/${ product.idProductos }`,
                    allProductDetails: `https://san-jose-reposteria.herokuapp.com/api/productDetail/${ product.idProductos }`
                }
            });

            if (productsFromDB) {
                res.status(200).json({
                    "count": totalProducts,
                    "countByCategory": totalCategorias,
                    "data": productsDetail,
                    "status": 200,
                    "msg": "Melo",
                    "endPoint": "/api/products",
                })
            } else {
                res.status(500).json({ "msg": "500- Ocurrio un error" });
            }

        } catch (error) {
            console.log(error);
        }
    },
    getProductDetail: async (req, res) => {
        try {
            const product = await db.Producto.findOne({
                include: {
                    association: "categorias"
                },
                where: { idProductos: req.params.id }
            });

            const productData = {
                id: product.idProductos,
                name: product.nombre,
                imagen: product.imagen_1,
                category: product.categoria_id,
                price: product.precio,
                description: product.descripcion,
                size: product.tamaño,
            };

            const imageUrl = {
                image_1: `https://san-jose-reposteria.herokuapp.com/images/Productos/${ product.imagen_1}`,
                image_2: `https://san-jose-reposteria.herokuapp.com/images/Productos/${ product.imagen_2}`,
                image_3: `https://san-jose-reposteria.herokuapp.com/images/Productos/${ product.imagen_3}`
            }

            const ProductRelation = ["categorias"];

            if (product) {
                res.status(200).json({
                    "data": productData,
                    "relations": ProductRelation,
                    "imagesUrl": imageUrl,
                    "status": 200,
                    "msg": "Melo",
                    "endPoint": "/api/productDetail/:id",
                })
            } else {
                res.status(500).json({ "msg": "500- Ocurrio un error" });
            }

        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = apiProductsController;