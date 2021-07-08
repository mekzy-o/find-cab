import { DataTypeAbstract, DefineAttributeColumnOptions } from 'sequelize';
import * as Sequelize from 'sequelize';

type SequelizeAttribute = string | DataTypeAbstract | DefineAttributeColumnOptions

export type SequelizeAttributes<T extends { [key: string]: any }> = {
  [P in keyof T]: SequelizeAttribute;
}

export interface DbInterface {
  sequelize: Sequelize.Sequelize,
  Sequelize: Sequelize.SequelizeStatic
}
