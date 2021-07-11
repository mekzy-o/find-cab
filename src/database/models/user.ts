import * as Sequelize from 'sequelize';
import argon2 from 'argon2';
import { SequelizeAttributes } from '../../types/databaseTypes';

export interface UserAttributes {
  id?: number,
  name: string,
  email: string,
  password: string,
  phone_number: string,
  license_number: string,
  car_number: string,
  status: string,
  createdAt?: Date
  updatedAt?: Date
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  dataValues: UserAttributes;
  user: any;
}

export const UserModel = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
  name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone_number: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    license_number: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    car_number: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue:'inactive',
    },
  }

  const User = sequelize.define<UserInstance, UserAttributes>('user', attributes)

  User.associate = models => {
    User.hasMany(models.Verification, { foreignKey: 'email', as: 'useremail' })
    User.hasMany(models.Location, { foreignKey: 'id', as: 'user' })
  } 
 

  return User
}