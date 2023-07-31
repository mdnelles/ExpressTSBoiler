import Sequelize from 'sequelize';
import { db } from '../config';

export const Payments = db.sequelize.define(
  'payments',
  {
    customerNumber: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    checkNumber: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    paymentDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    amount: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);
