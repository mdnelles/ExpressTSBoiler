// ALTER TABLE Employee ADD CONSTRAINT FOREIGN KEY(Shop) REFERENCES Shop(ID);
// import Sequelize from 'sequelize';
// import { db } from '../config';
// import { EmployeeType } from './EmployeeType';
// import { Shop } from './Shop';

// export const Employee = db.sequelize.define('Employee', {
//   ID: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   Name: {
//     type: Sequelize.STRING
//   },
//   Type: {
//     type: Sequelize.STRING
//   },
//   Telephone: {
//     type: Sequelize.STRING
//   },
//   Address: {
//     type: Sequelize.STRING
//   },
//   EmploymentDate: {
//     type: Sequelize.DATEONLY
//   },
//   EmployeeType: {
//     type: Sequelize.INTEGER
//   },
//   Shop: {
//     type: Sequelize.INTEGER
//   }
// });

// Employee.belongsTo(EmployeeType, {
//   foreignKey: 'EmployeeType'
// });

// Employee.belongsTo(Shop, {
//   foreignKey: 'Shop'
// });

// EmployeeType.hasMany(Employee, {
//   foreignKey: 'employeeType',
// });

// const employees = await Employee.findAll({
//   include: {
//     model: EmployeeType,
//   },
// });
