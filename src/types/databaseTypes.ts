import { DataTypeAbstract, DefineAttributeColumnOptions } from 'sequelize';
import * as Sequelize from 'sequelize';
import { UserAttributes, UserInstance } from '../database/models/user';
import { VerificationAttributes, VerificationInstance } from '../database/models/verification';
import { LocationInstance, LocationAttributes } from '../database/models/location';

type SequelizeAttribute = string | DataTypeAbstract | DefineAttributeColumnOptions

export type SequelizeAttributes<T extends { [key: string]: any }> = {
  [P in keyof T]: SequelizeAttribute;
}

export interface DbInterface {
  sequelize: Sequelize.Sequelize,
  Sequelize: Sequelize.SequelizeStatic,
  User: Sequelize.Model<UserInstance, UserAttributes>,
  Verification: Sequelize.Model<VerificationInstance, VerificationAttributes>,
  Location: Sequelize.Model<LocationInstance, LocationAttributes>
}
