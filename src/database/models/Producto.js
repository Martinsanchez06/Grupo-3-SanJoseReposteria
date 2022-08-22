module.exports= (sequelize, dataTypes) => {
    let alias= "Producto"
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
        imagen_1: {
            type: dataTypes.BLOB,
            notNull: true
        },
        imagen_2: {
            type: dataTypes.BLOB,
            notNull: true
        },
        imagen_3: {
            type: dataTypes.BLOB,
            notNull: true
        },
        categoria: {
            type: dataTypes.STRING,
            notNull: true
        },
        precio: {
            type: dataTypes.STRING,
            notNull: true
        },
        descripcion: {
            type: dataTypes.STRING,
            notNull: true
        }

    }
    
  let config = {
    tableName: "productos",
    timestamps: false,
  };
    const Producto= sequelize.define(alias, cols, config)

    return Producto
}