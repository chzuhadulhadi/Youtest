'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('landingpage', 'testId', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'test',
                key: 'id',
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('landingpage', 'testId');
    },
};
