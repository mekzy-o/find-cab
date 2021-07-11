'use strict'

module.exports = {
  //@ts-ignore
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    return queryInterface.createTable('locations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      latitude: {
        allowNull:false,
        type: Sequelize.DOUBLE
      },
      longitude: {
        allowNull:false,
        type: Sequelize.DOUBLE
      },
      userid: {
        allowNull: false,
        type: Sequelize.UUID,
        onUpdate:"CASCADE",
        onDelete:"CASCADE",
        references: {
          model: 'users',
          key: 'id',
        },
      },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        }  
    })},
  //@ts-ignore
  down: queryInterface => queryInterface.dropTable('locations')
}
