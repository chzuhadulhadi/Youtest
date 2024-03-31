module.exports = (sequelize, DataTypes) => {
  const email = sequelize.define(
    "email",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      to: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      body: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        allowNull: false,
        Comment: "0-Not Sent /n 1-Sent",
      },
    },
    {
      tableName: "email",
      timestamps: false,
      paranoid: true,
    }
  );
  email.sync({ force: false });
  return email;
};
