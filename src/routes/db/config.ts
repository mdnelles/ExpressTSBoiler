import sqlite3 from 'sqlite3';

/* eslint-disable */
const env = require('dotenv').config().parsed;

export const db = new sqlite3.Database(env.DBPATH, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

import { Sequelize } from 'sequelize';

export const dbconn: any = {};
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: env.DBPATH // Replace with the actual path to your SQLite database file
});

dbconn.sequelize = sequelize;
dbconn.Sequelize = Sequelize;
