module.exports = (sequelize, DataTypes) => {
	const test = sequelize.define(
		'test',
		{
			id: {
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			language: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			showuser: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: false,
				Comment: '0-false /n 1-true',
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			orientation: {
				type: DataTypes.TINYINT,
				allowNull: false,
				Comment: '1-oneByOne /n 2-List',
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
				Comment: '1-fixed /n 2-variation',
			},
			randomOrder: {
				type: DataTypes.TINYINT,
				allowNull: false,
				Comment: '0-false /n 1-true',
			},
			sendAll: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: false,
				Comment: '0-false /n 1-true',
			},
			testObj: {
				type: DataTypes.JSON,
				allowNull: false,
			},
			timeLimit: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			layout: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: {},
			},
			resultStructure: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: {},
			},
			automaticText: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: {},
			},
			categoryStore: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: {},
			},
			createdAt: {
				allowNull: false,
				defaultValue: sequelize.fn('now'),
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				defaultValue: sequelize.fn('now'),
				type: DataTypes.DATE,
			},
			deletedAt: {
				type: DataTypes.DATE,
			},
			createdById: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			timeAvailability: {
				type: DataTypes.JSON,
				allowNull: true,
			},
		},
		{
			tableName: 'test',
			timestamps: false,
			paranoid: true,
		}
	);
	return test;
};
