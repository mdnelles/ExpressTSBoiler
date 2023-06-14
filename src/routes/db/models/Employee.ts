import Sequelize from "sequelize";
   import { db } from '../config';
   
   export const Employee = db.sequelize.define(
    "Employee",
    {
        ID: {
          type: Sequelize.INTEGER, 
					primaryKey: true, 
					autoIncrement: true,
        allowNull: false,
      },
        Name: {
          type: Sequelize.STRING,  
        allowNull: false,
      },
        Type: {
          type: Sequelize.STRING,  
        allowNull: false,
      },
        Telephone: {
          type: Sequelize.STRING,  
        allowNull: false,
      },
        Address: {
          type: Sequelize.STRING,  
        allowNull: false,
      },
        EmploymentDate: {
          type: Sequelize.DATEONLY,  
        allowNull: false,
      },
        EmployeeType: {
          type: Sequelize.INTEGER,  
        allowNull: false,
      },
        Shop: {
          type: Sequelize.INTEGER,  
        allowNull: false,
      },
       },
      {
        timestamps: false,
     }); 