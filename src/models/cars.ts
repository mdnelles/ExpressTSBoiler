import Sequelize from 'sequelize';
import { db } from '../config/dbconfig';

export const Cars = db.sequelize.define(
  'cars',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,

      allowNull: false
    },
    year: {
      type: Sequelize.INTEGER,

      allowNull: false
    }
  },
  {
    timestamps: false
  }
);
