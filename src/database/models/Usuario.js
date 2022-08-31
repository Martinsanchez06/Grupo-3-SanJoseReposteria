module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario"
    let cols = {
        idUsuarios: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            unique: true,
            autoIncrement: true
        },
        numeroID: {
            type: dataTypes.STRING,
            notnull: true
        }
        ,
        nombre: {
            type: dataTypes.STRING,
            notNull: true
        },
        email: {
            type: dataTypes.STRING,
            notNull: true
        },
        fechanacimiento: {
            type: dataTypes.STRING,
            notNull: true
        },
        ciudad: {
            type: dataTypes.STRING,
            notNull: true
        },
        password: {
            type: dataTypes.STRING,
            notNull: true
        }, 
        con_password: {
            type: dataTypes.STRING,
            notNull: true
        },
        politica :{
            type: dataTypes.STRING,
            notnull: true
        },
        avatar: {
            type: dataTypes.STRING,
            notNull: true
        }

    }

    let config = {
        tableName: "usuarios",
        timestamps: false,
    };
    const Usuario = sequelize.define(alias, cols, config)

    return Usuario
}