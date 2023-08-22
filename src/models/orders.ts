import Sequelize from 'sequelize';
import { db } from '../config/dbconfig';

const Orders = db.sequelize.define(
  'orders',
  {
    orderNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    orderDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    requiredDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    shippedDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    },
    comments: {
      type: Sequelize.STRING,
      allowNull: false
    },
    customerNumber: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);
export default Orders;
