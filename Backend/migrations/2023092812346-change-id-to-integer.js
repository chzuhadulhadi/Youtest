'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Add a new auto-incremented column named 'anotherIncremental'
        await queryInterface.addColumn('usertest', 'number', {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Remove the 'anotherIncremental' column during rollback
        await queryInterface.removeColumn('usertest', 'number');
    },
};
