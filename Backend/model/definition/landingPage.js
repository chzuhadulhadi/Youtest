module.exports = (sequelize, DataTypes) => {
  const landingPage = sequelize.define(
    "landingPage",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      html: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    },
    {
      tableName: "landingpage",
      timestamps: false,
      paranoid: true,
    }
  );
  return landingPage;
};
