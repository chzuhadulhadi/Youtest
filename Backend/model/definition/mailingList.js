module.exports = (sequelize, DataTypes) => {
  const mailingList = sequelize.define(
    "mailingList",
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
      }
    },
    {
      tableName: "mailinglist",
      timestamps: false,
      paranoid: true,
    }
  );
  return mailingList;
};
