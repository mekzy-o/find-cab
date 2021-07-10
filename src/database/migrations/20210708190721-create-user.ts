'use strict'

module.exports = {
  //@ts-ignore
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      name: {
        allowNull:false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          len: [8, 72]
        }
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          len:[10]
        }
      },
      license_number: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      car_number: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      status:{
        type: Sequelize.ENUM,
        values: [
          'active',
          'inactive'  
        ],
        defaultValue: 'inactive',
        allowNull: false,
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
  down: queryInterface => queryInterface.dropTable('users')
}
