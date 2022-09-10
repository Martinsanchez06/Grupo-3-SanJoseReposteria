module.exports= (sequelize, dataTypes) => {
    let alias= "Categoria"
    let cols= {
        idCategorias: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            unique: true,
            autoIncrement: true
        }, 
        categoria: {
            type: dataTypes.STRING,
            notNull: true
        }
    }
    
  let config = {
    tableName: "categorias",
    timestamps: false,
  };
    const Categoria= sequelize.define(alias, cols, config)

    return Categoria
}
<<<<<<< HEAD

=======
>>>>>>> 2d8d0ade72070e807396ee0643f08f3720ee94aa
