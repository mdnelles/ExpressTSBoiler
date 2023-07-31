import Sequelize from 'sequelize';
import { db } from '../config';

export const Products = db.sequelize.define(
  'products',
  {
    productCode: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    productName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    productLine: {
      type: Sequelize.STRING,
      allowNull: false
    },
    productScale: {
      type: Sequelize.STRING,
      allowNull: false
    },
    productVendor: {
      type: Sequelize.STRING,
      allowNull: false
    },
    productDescription: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quantityInStock: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    buyPrice: {
      type: Sequelize.STRING,
      allowNull: false
    },
    MSRP: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);
