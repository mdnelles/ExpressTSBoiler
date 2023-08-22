import Sequelize from 'sequelize';
import { db } from '../config/dbconfig';

const Payments = db.sequelize.define(
  'payments',
  {
    customerNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    checkNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
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
export default Payments;
