import Sequelize from 'sequelize';
import { db } from '../config';

export const Orderdetails = db.sequelize.define(
  'orderdetails',
  {
    orderNumber: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    productCode: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    quantityOrdered: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    priceEach: {
      type: Sequelize.STRING,
      allowNull: false
    },
    orderLineNumber: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);
