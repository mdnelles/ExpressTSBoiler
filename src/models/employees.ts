import Sequelize from 'sequelize';
import { db } from '../config/dbconfig';

const Employees = db.sequelize.define(
  'employees',
  {
    employeeNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    extension: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    officeCode: {
      type: Sequelize.STRING,
      allowNull: false
    },
    reportsTo: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    jobTitle: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);
export default Employees;
