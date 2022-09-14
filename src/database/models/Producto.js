module.exports= (sequelize, dataTypes) => {
    let alias= "Producto"
    let cols= {
        idProductos: {
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
        categoria_id: {
<<<<<<< HEAD
            type: dataTypes.INTEGER,
=======
            type: dataTypes.STRING,
>>>>>>> 2d8d0ade72070e807396ee0643f08f3720ee94aa
            notNull: true
        },
        precio: {
            type: dataTypes.STRING,
            notNull: true
        },
        descripcion: {
            type: dataTypes.STRING,
            notNull: true
        },
        tamaño: {
            type: dataTypes.STRING,
            notNull: true
        }



    }
    
  let config = {
    tableName: "productos",
    timestamps: false,
  };
    const Producto= sequelize.define(alias, cols, config)

    Producto.associate = function(models){
        Producto.belongsTo(models.Categoria, {
            as: 'categorias', 
            foreignKey: 'categoria_id'
        })

    }

<<<<<<< HEAD
=======

>>>>>>> 2d8d0ade72070e807396ee0643f08f3720ee94aa
    return Producto
}

