module.exports = (sequelize, DataTypes) => {
  const userTest = sequelize.define(
    "userTest",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      userEmail: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      orientation: {
        type: DataTypes.TINYINT,
        allowNull: false,
        Comment: "1-oneByOne /n 2-List",
      },
      beforeTestText: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      afterTestText: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      scoringType: {
        type: DataTypes.TINYINT,
        allowNull: false,
        Comment: "1-fixed /n 2-variation",
      },
      randomOrder: {
        type: DataTypes.TINYINT,
        allowNull: false,
        Comment: "0-false /n 1-true",
      },
      sendAll: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        Comment: "0-false /n 1-true",
      },
      testObj: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      testStart: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      testEnd: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      timeLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      layout: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {}
      },
      resultStructure: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {}
      },
      automaticText: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {}
      },
      categoryStore: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {}
      },
      landingPageData: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {}
      },
      additionalDetails: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {}
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
      }
    },
    {
      tableName: "usertest",
      timestamps: false,
      paranoid: true,
    }
  );
  return userTest;
};
