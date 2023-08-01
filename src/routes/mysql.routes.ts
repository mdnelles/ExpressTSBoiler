import { db } from '../db/config';
import Sequelize from 'sequelize';
import type express from 'express';
import { createModelsMySQL } from './init/doModelsMySQL';
import { generateDummyDataString } from '../utils/generateDummy';
import {
  generateDeleteQuery,
  generateInsertQuery,
  generateUpdateQuery
} from '../utils/generateSQL';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

export const selectAll = async (
  req: express.Request,
  res: express.Response
) => {
  const { table, limit = 10 } = req.body;
  try {
    // const data = await db.sequelize.models[table].findAll({limit: limit});
    const data = await db.sequelize.query(
      `SELECT * FROM ${table} LIMIT ${limit}`,
      db.sequelize.QueryTypes.SELECT
    );
    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const insertOne = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { table, values } = req.body;
    console.log(values);
    const valuesParsed = JSON.parse(values);
    // const data = await Cars.create(valuesParsed, silent);
    // const data = await db.sequelize.models[table].create(valuesParsed);
    const data = await db.sequelize.query(
      generateInsertQuery(table, valuesParsed),
      db.sequelize.QueryTypes.INSERT
    );
    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.log(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const selectOne = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { table, field, value } = req.body;
    const data = await db.sequelize.query(
      `SELECT * FROM ${table} WHERE ${field} = '${value}' LIMIT 1`
    );
    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const selectFields = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // SELECT foo, bar FROM ... attributes: ['foo', 'bar']
    const { table, attributes } = req.body;
    const data = db.sequelizemodels[table].findAll({
      attributes
    });
    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const updateOne = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { table, updateField, updateValue, whereCondition } = req.body;
    const data = db.sequelize.query(
      generateUpdateQuery(table, updateField, updateValue, whereCondition)
    );
    // const data = await db.sequelize.update(
    //   table,
    //   {
    //     [field]: value
    //   },
    //   where,
    //   {
    //     type: db.sequelize.QueryTypes.UPDATE
    //   }
    // );

    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const deleteOne = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { table, field, value } = req.body;
    const data = await db.sequelize.query(
      generateDeleteQuery(table, field, value)
    );
    // const data = await db.sequelize.models[table].destroy({
    //   where: {
    //     [field]: value
    //   }
    // });

    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const deleteAll = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { table } = req.body;
    const data = db.sequelize.models[table].destroy({
      truncate: true
    });
    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const insertData = async (
  req: express.Request,
  res: express.Response
) => {
  const { dbname } = req.body;
  try {
    const tableNames = await db.sequelize.query(`SHOW TABLES FROM ${dbname} `, {
      type: Sequelize.QueryTypes.SHOWTABLES
    });
    tableNames.map(async (tableName: any) => {
      // Retrieve column information for the current table
      const columns = await db.sequelize.query(
        `SHOW COLUMNS FROM ${dbname}.${tableName}`
      );

      // Generate dummy data based on data types and insert 5 items
      const obj = generateDummyDataString(columns[0]);
      await db.sequelize.query(
        `INSERT INTO ${tableName} (${obj.cols}) VALUES (${obj.vals}); `
      );
    });

    res.json({ msg: 'success', err: false, status: 200 });
  } catch (error) {
    res.json({ msg: 'error occured', err: true, status: 500, error });
  }
};

export const createTableByData = async (
  req: express.Request,
  res: express.Response
) => {
  const { tableName } = req.body;

  try {
    const string = req.body.objRaw
      .replace(/},/g, '}~~~')
      .replace('[', '')
      .replace(/\n/g, '')
      .replace(/\t/g, '')
      .replace(']', '')
      .trim();

    // Step 2: Split the string by commas
    const stringArray = string.split('~~~');
    let objArr: any[] = [];

    stringArray.map((str: any) => {
      let data = `{${str.substring(
        str.indexOf('{') + 1,
        str.lastIndexOf('}')
      )}}`;

      data = str.replace(/'/g, '"');
      // make attribute names double quotes
      data = data.replace(/([a-zA-Z0-9]+?):/g, '"$1":');

      // if there is a coma after the last curly brace, remove it
      if (data[data.length - 1] === ',') data = data.slice(0, -1);

      objArr = [...objArr, JSON.parse(data)];
      return objArr;
    });

    console.log(objArr[0]);
    // print out the attribute names of the first object
    console.log(Object.keys(objArr[0]));

    const obj = objArr[0];
    const columns = Object.keys(obj).map((key) => {
      const type = typeof obj[key];
      return {
        name: key,
        type:
          type === 'boolean'
            ? 'boolean'
            : type === 'number'
            ? 'int'
            : 'varchar(45)'
      };
    });

    const createTableQuery = `
    CREATE TABLE ${tableName} (
      ${columns.map((column) => `${column.name} ${column.type}`).join(', ')}
    );
    `;
    // iterate over the column values and push into arrVal

    await db.sequelize.query(`DROP TABLE IF EXISTS ${tableName};`);
    await db.sequelize.query(createTableQuery);

    objArr.forEach(async (obj) => {
      const cols = columns.map((column) => `${column.name}`).join(', ');
      const vals = columns
        .map((column) =>
          column.type.includes('char')
            ? `'${obj[column.name]}'`
            : obj[column.name]
        )
        .join(', ');
      const insertQuery = `INSERT INTO ${tableName} (${cols} ) VALUES ( ${vals} ); `;

      try {
        await db.sequelize.query(insertQuery, {
          type: Sequelize.QueryTypes.INSERT
        });
        console.log(`Successfully inserted row ${obj.id}`);
      } catch (err) {
        console.error(err);
      }
    });

    res.json({ msg: 'success', err: false, status: 200 });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error occured', err: true, status: 500, error });
  }
};

export const joinSQL = async (req: express.Request, res: express.Response) => {
  try {
    const { table1Name, table2Name, table1JoinAttribute, table2JoinAttribute } =
      req.body;

    // Sanitize inputs to prevent SQL injection
    const sanitizedTable1Name = db.sequelize
      .getQueryInterface()
      .escape(table1Name);
    const sanitizedTable2Name = db.sequelize
      .getQueryInterface()
      .escape(table2Name);
    const sanitizedTable1JoinAttribute = db.sequelize
      .getQueryInterface()
      .escape(table1JoinAttribute);
    const sanitizedTable2JoinAttribute = db.sequelize
      .getQueryInterface()
      .escape(table2JoinAttribute);

    const sqlQuery = `
      SELECT *
      FROM ${sanitizedTable1Name} as t1
      JOIN ${sanitizedTable2Name} as t2
      ON t1.${sanitizedTable1JoinAttribute} = t2.${sanitizedTable2JoinAttribute}
    `;

    const results = await db.sequelize.query(sqlQuery, {
      type: db.sequelize.QueryTypes.SELECT
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while joining tables' });
  }
};

export const initModelsMySQL = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const dbname = req.body.dbname || env.MYSQLDB;
    const tmp = await createModelsMySQL(dbname, res);
    console.log(tmp);
  } catch (error) {
    console.log(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};
