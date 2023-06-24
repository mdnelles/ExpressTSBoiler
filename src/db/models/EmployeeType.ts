import Sequelize from 'sequelize';
import { db } from '../config';

export const EmployeeType = db.sequelize.define(
  'EmployeeType',
  {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Salary: {
      type: Sequelize.FLOAT,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);
