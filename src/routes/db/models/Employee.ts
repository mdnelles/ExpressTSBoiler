import Sequelize from "sequelize";
   import { db } from '../config';
   
   export const Employee = db.sequelize.define(
    "Employee",
    {
        ID: {
          type: Sequelize.INTEGER, 
					primaryKey: true, 
					autoIncrement: true,
        },
        Name: {
          type: Sequelize.STRING,  
        },
        Type: {
          type: Sequelize.STRING,  
        },
        Telephone: {
          type: Sequelize.STRING,  
        },
        Address: {
          type: Sequelize.STRING,  
        },
        EmploymentDate: {
          type: Sequelize.DATEONLY,  
        },
        EmployeeType: {
          type: Sequelize.INTEGER,  
        },
        Shop: {
          type: Sequelize.INTEGER,  
        },
       }); 