const config = require('../config.json');
const { Sequelize } = require('sequelize');

var database = new Sequelize(config.db);


database.sync({ force: false }).then(() => {
	console.log('Database & tables created!');
}
).catch((err) => {
	console.log("db error-------------------------", err);
});
database
	.authenticate()
	.then(() => {
		console.log('database connected');
	})
	.catch((err) => {
		console.log("db error-------------------------", err);
	});

module.exports = database;
