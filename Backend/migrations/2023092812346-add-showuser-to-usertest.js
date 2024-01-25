'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Add a new auto-incremented column named language
        await queryInterface.addColumn('usertest', 'showuser', {
            type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        Comment: "0-false /n 1-true",
        });
        await  queryInterface.addColumn('test', 'showuser', {
            type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        Comment: "0-false /n 1-true",
        });
    },
    down: async (queryInterface, Sequelize) => {
        // Remove column named language
        await queryInterface.removeColumn('test', 'showuser');
        await queryInterface.removeColumn('usertest', 'showuser');
    },
};
