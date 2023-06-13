import Sequelize from "sequelize";
   import { db } from '../config';
   
   export const Shop = db.sequelize.define(
    "Shop",
    {
        ID: {
          type: Sequelize.INTEGER, 
					primaryKey: true, 
					autoIncrement: true,
        },
        Name: {
          type: Sequelize.STRING,  
        },
        Address: {
          type: Sequelize.STRING,  
        },
        Telephone: {
          type: Sequelize.STRING,  
        },
       }); 