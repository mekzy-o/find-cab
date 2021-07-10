import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../types/databaseTypes';

export interface VerificationAttributes {
  id?: number,
  token: string,
  email: string,
  createdAt?: Date
  updatedAt?: Date
}
export interface VerificationInstance extends Sequelize.Instance<VerificationAttributes>, VerificationAttributes {}

export const VerificationModel = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<VerificationInstance, VerificationAttributes> => {
  const attributes: SequelizeAttributes<VerificationAttributes> = {
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    token: {
        type: Sequelize.STRING,
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

  const Verification = sequelize.define<VerificationInstance, VerificationAttributes>('verification', attributes)

  Verification.associate = models => {} 
  

  return Verification
}