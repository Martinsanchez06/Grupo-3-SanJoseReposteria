const db = require("../src/database/models");
const mainController = {
    index: (req, res) => {
        db.Producto.findAll({
            include: [{ association: 'categorias' }],
        })
            .then(function (productos) {
                res.render("home", { productos: productos })
            })

    }
};

module.exports = mainController;