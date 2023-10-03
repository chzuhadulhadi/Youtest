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
      },
      testId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      tableName: "landingpage",
      timestamps: false,
      paranoid: true,
    }
  );
  return landingPage;
};
