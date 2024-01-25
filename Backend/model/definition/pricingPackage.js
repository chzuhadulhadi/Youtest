module.exports = (sequelize, DataTypes) => {
  const PricingPackage = sequelize.define(
    "PricingPackage",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      packageName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      packagePrice: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      packageDuration: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      numberOfTests: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      support: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        defaultValue: sequelize.fn("now"),
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: sequelize.fn("now"),
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },

    },
    {
      tableName: "PricingPackage",
      timestamps: false,
      paranoid: true,
    }
  );
  PricingPackage.sync({ force: false });
  return PricingPackage;
};
