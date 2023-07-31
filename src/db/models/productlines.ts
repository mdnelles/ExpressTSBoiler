import Sequelize from 'sequelize';
import { db } from '../config';

export const Productlines = db.sequelize.define(
  'productlines',
  {
    productLine: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    textDescription: {
      type: Sequelize.STRING,
      allowNull: false
    },
    htmlDescription: {
      type: Sequelize.STRING,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);
