const db = require("../../src/database/models");


const apiUsuariosController = {
    getAllUsuarios: async (req, res) => {

        try {
            const usuariosFromDB = await db.Usuario.findAll();

        
            const usuariosDetalle = usuariosFromDB.map(usuario => {
                return {
                    id: usuario.idUsuarios,
                    name: usuario.nombre,
                    email: usuario.email,
                    detail: `http://localhost:3000/api/usuarios/${ usuario.idUsuarios }`
                }
            });

            const usuariosTotal = usuariosFromDB.length;

            if (usuariosFromDB) {
                res.status(200).json({
                    "count": usuariosTotal,
                    "data": usuariosDetalle,
                    "status": 200,
                    "msg": "Todo Correcto",
                    "endPoint": "/api/usuarios",
                })
            } else {
                res.status(500).json({ "msg": "500- Ocurrio un error" });
            }

        } catch (error) {
            console.log(error);
        }
    },

    getUsuariosDetalle: async (req, res) => {
        try {
            const usuario = await db.Usuario.findOne({
                where: { idUsuarios: req.params.id }
            });

            const datosUsuarios = {
                id: usuario.idUsuarios,
                numeroId: usuario.numeroID,
                nombre: usuario.nombre,
                email: usuario.email,
                fechaNac: usuario.fechanacimiento,
                ciudad: usuario.ciudad,
            };

            const avatarUser = {
                avatar: `http://localhost:3000/images/avatars/${ usuario.avatar}`,
            }

            if (usuario) {
                res.status(200).json({
                    "data": datosUsuarios,
                    "avatarUrl": avatarUser,
                    "status": 200,
                    "msg": "Todo Correcto",
                    "endPoint": "/api/usuarios/:id",
                })
            } else {
                res.status(500).json({ "msg": "500- Ocurrio un error" });
            }

        } catch (error) {
            console.log(error);
        }
    }
    
};

module.exports = apiUsuariosController;