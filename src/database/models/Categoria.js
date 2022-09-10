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
