import Sequelize from 'sequelize';
import { db } from '../config/dbconfig';

const Customers = db.sequelize.define(
  'customers',
  {
    customerNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customerName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    contactLastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    contactFirstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    addressLine1: {
      type: Sequelize.STRING,
      allowNull: false
    },
    addressLine2: {
      type: Sequelize.STRING,
      allowNull: false
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false
    },
    postalCode: {
      type: Sequelize.STRING,
      allowNull: false
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false
    },
    salesRepEmployeeNumber: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    creditLimit: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);
export default Customers;
