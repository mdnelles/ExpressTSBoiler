import Sequelize from 'sequelize';
import { db } from '../config/dbconfig';

const Productlines = db.sequelize.define(
  'productlines',
  {
    productLine: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
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
export default Productlines;
