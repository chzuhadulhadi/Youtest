'use strict';

const { sequelize } = require("../model/definition");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('usertest', 'sendAll', {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('usertest', 'sendAll');
    },
};
