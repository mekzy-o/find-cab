import Sequelize from 'sequelize';
import { DbInterface } from '../../types/databaseTypes';
import { UserModel } from './user';
import { VerificationModel } from './verification';
import { LocationModel } from './location';

const env = process.env.NODE_ENV || 'development'
const config = require('../config')[env]

const url = config.url || process.env.DATABSE_URL

const sequelize = new Sequelize(url, { ...config, query: { raw: true } })

const db: DbInterface = {
  sequelize,
  Sequelize,
  User: UserModel(sequelize, Sequelize),
  Verification: VerificationModel(sequelize, Sequelize),
  Location: LocationModel(sequelize, Sequelize)
}

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db)
  }
})

export default db
