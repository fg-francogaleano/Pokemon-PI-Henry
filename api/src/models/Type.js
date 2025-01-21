const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "type",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      icon_svg: {
        type: DataTypes.TEXT, // Almacena el contenido del SVG
        allowNull: true, // Opcional
      },
    },
    {
      timestamps: false,
    }
  );
};
