const db = require("../src/database/models");
const Op = db.Sequelize.Op;
const mainController = {
    index: (req, res) => {
        db.Producto.findAll({
            include: [{ association: 'categorias' }],
            limit: 9
        })
            .then(function (productos) {
                res.render("home", { productos: productos })
            })

    }
};

module.exports = mainController;