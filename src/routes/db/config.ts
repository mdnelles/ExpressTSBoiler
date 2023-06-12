import { Sequelize } from 'sequelize';
/* eslint-disable */
const env = require('dotenv').config().parsed;
const host = env.MYSQLHOST;

export const db: any = {};
try {
  const sequelize = new Sequelize(env.MYSQLDB, env.MYSQLUSER, env.MYSQLPASS, {
    port: env.MYSQLPORT,
    host,
    dialect: 'mysql',
    //logging: console.log,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  db.sequelize = sequelize;
  db.sequelizemodels = {};
  db.Sequelize = Sequelize;
} catch (error) {
  console.log(error);
}

// import sqlite3 from 'sqlite3';

// /* eslint-disable */
// const env = require('dotenv').config().parsed;

// export const db = new sqlite3.Database(env.DBPATH, (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Connected to the database.');
// });

// import { Sequelize } from 'sequelize';

// export const dbconn: any = {};
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: env.DBPATH // Replace with the actual path to your SQLite database file
// });

// dbconn.sequelize = sequelize;
// dbconn.Sequelize = Sequelize;
