module.exports = (sequelize, DataTypes) => {
  const UserPackagePlan = sequelize.define(
    "UserPackagePlan",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      packageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      paymentId: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      RemainingNumberOfTests: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      paymentStatus: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      expireDate: {
        type: DataTypes.DATE,
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
      tableName: "UserPackagePlan",
      timestamps: false,
      paranoid: true,
    }
  );
  return UserPackagePlan;
};
