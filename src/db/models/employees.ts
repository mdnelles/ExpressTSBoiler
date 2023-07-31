import Sequelize from 'sequelize';
import { db } from '../config';

export const Employees = db.sequelize.define(
  'employees',
  {
    employeeNumber: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
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
