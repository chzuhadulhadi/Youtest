const config = require('../config.json');
const { Sequelize } = require('sequelize');
const database = new Sequelize(
	config.db.database,
	config.db.username,
	config.db.password,
	{
		host: config.db.host,
		dialect: config.db.dialect,
	}
);

// database
// 	.sync({ force: true })
// 	.then(() => {
// 		console.log('Database & tables created!');
// 	})
// 	.catch((err) => {
// 		console.log('db error-------------------------', err);
// 	});
database
	.authenticate()
	.then(() => {
		console.log('database connected');
	})
	.catch((err) => {
		console.log('db error-------------------------', err);
	});

module.exports = database;
