import Sequelize from 'sequelize';
import { db } from '../config/dbconfig';

const Orderdetails = db.sequelize.define(
  'orderdetails',
  {
    orderNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    productCode: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
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
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);
export default Orderdetails;
