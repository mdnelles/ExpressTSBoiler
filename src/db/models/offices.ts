import Sequelize from 'sequelize';
import { db } from '../config';

export const Offices = db.sequelize.define(
  'offices',
  {
    officeCode: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    city: {
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
    state: {
      type: Sequelize.STRING,
      allowNull: false
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false
    },
    postalCode: {
      type: Sequelize.STRING,
      allowNull: false
    },
    territory: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);
