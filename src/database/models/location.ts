import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../types/databaseTypes';

export interface LocationAttributes {
  id?: number,
  latitude: string,
  longitude: string,
  userid: string,
  createdAt?: Date
  updatedAt?: Date
}
export interface LocationInstance extends Sequelize.Instance<LocationAttributes>, LocationAttributes {
  rows: any;
}

export const LocationModel = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<LocationInstance, LocationAttributes> => {
  const attributes: SequelizeAttributes<LocationAttributes> = {
    latitude: {
      allowNull: false,
      type: DataTypes.STRING
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userid: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }, 
}

  const Location = sequelize.define<LocationInstance, LocationAttributes>('location', attributes)

  Location.associate = models => {
    // Location.belongsTo(models.User, { foreignKey: 'id', as: 'user' })
  } 
  

  return Location
}