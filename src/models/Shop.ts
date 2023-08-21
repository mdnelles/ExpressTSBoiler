import Sequelize from 'sequelize';
import { db } from '../config/dbconfig';

export const Shop = db.sequelize.define(
  'Shop',
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
    Address: {
      type: Sequelize.STRING,

      allowNull: false
    },
    telephone: {
      type: Sequelize.STRING,

      allowNull: false
    }
  },
  {
    timestamps: false
  }
);
