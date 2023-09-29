module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING(201),
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      phoneNumberCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
      termsAndService: {
        type: DataTypes.TINYINT,
        allowNull: false,
        Comment: "0-False /n 1-True",
      },
      promotions: {
        type: DataTypes.TINYINT,
        allowNull: true,
        Comment: "0-False /n 1-True",
      },
      role: {
        type: DataTypes.TINYINT,
        allowNull: true,
        Comment: "1-Admin /n 1-User",
      },

      emailVerified: {
        type: DataTypes.TINYINT,
        allowNull: true,
        Comment: "0-UnVerified /n 1-Verified",
        defaultValue: 0
      },
      verificationToken: {
        type: DataTypes.STRING(64),
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
      tableName: "user",
      timestamps: false,
      paranoid: true,
    }
  );
  return user;
};
