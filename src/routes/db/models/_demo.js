// ALTER TABLE Customer ADD CONSTRAINT FOREIGN KEY(Store) REFERENCES Store(ID);
// SELECT column_name(s) FROM table_name1 LEFT JOIN table_name2 ON table_name1.column_name = table_name2.column_name

// SELECT
//   customer.id,
//   customer.name,
//   customer.shopID,
//   shop.name AS shopName,
//   customer.customerTypeID,
//   customerType.name AS customerTypeName
// FROM customer
// LEFT JOIN shop
// ON customer.shopID = shop.id
// LEFT JOIN customerType
// ON customer.customerTypeID = customerType.id;

// const customers = await Customer.findAll({
//     include: {
//       model: Store,
//       attributes: ['name'],
//     },
//     include: {
//       model: CustomerType,
//       attributes: ['name'],
//     },
//   });

// import Sequelize from 'sequelize';
// import { db } from '../config';
// import { CustomerType } from './CustomerType';
// import { Store } from './Store';

// export const Customer = db.sequelize.define('Customer', {
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
//   CustomerType: {
//     type: Sequelize.INTEGER
//   },
//   Store: {
//     type: Sequelize.INTEGER
//   }
// });

// Customer.belongsTo(CustomerType, {
//   foreignKey: 'CustomerType'
// });

// Customer.belongsTo(Store, {
//   foreignKey: 'Store'
// });

// CustomerType.hasMany(Customer, {
//   foreignKey: 'customerType',
// });

// const customers = await Customer.findAll({
//   include: {
//     model: CustomerType,
//   },
// });
