module.exports = (sequelize, DataTypes) => {
  const mailingListUser = sequelize.define(
    "mailingListUser",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(),
        allowNull: false,
      }
    },
    {
      tableName: "mailinglistuser",
      timestamps: false,
      paranoid: true,
    }
  );
  return mailingListUser;
};
