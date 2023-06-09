import Sequelize from 'sequelize';
import { db } from '../config';

export const EmployeeType = db.sequelize.define('EmployeeType', {
  ID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  Name: {
    type: Sequelize.STRING
  },
  Salary: {
    type: Sequelize.FLOAT
  }
});
