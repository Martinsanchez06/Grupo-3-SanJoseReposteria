module.exports= (sequelize, dataTypes) => {
    let alias= "Usuario"
    let cols= {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            unique: true,
            autoIncrement: true
        }, 
        nombre: {
            type: dataTypes.STRING,
            notNull: true
        },
        email: {
            type: dataTypes.STRING,
            notNull: true
        },
        fecha_n: {
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
        telefono: {
            type: dataTypes.STRING,
            notNull: true
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
    const Usuario= sequelize.define(alias, cols, config)

    return Usuario
}