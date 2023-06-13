import { db } from '../db/config';
import Sequelize from 'sequelize';
import express from 'express';
import { createModelsMySQL } from '../init/doModelsMySQL';
import { generateDummyDataString } from '../../utils/generateDummy';

export const insertOne = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { table, values } = req.body;
    const data = await db.sequelize.models[table].create(values);
    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const initMapsMySQL = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { dbname } = req.body;
    const tmp = await createModelsMySQL(dbname, res);
    console.log(tmp);
  } catch (error) {
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const selectAll = async (
  req: express.Request,
  res: express.Response
) => {
  const { table, limit = 10 } = req.body;
  try {
    const data = await db.sequelize.models[table].findAll({
      limit: limit
    });
    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const selectOne = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { table, field, value } = req.body;
    const data = db.sequelize.query(
      `SELECT * FROM ${table} WHERE ${field} = '${value}' `
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
    //SELECT foo, bar FROM ... attributes: ['foo', 'bar']
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
    const { table, field, value, where } = req.body;
    const data = await db.sequelize.update(
      table,
      {
        [field]: value
      },
      where,
      {
        type: db.sequelize.QueryTypes.UPDATE
      }
    );

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
    const data = await db.sequelize.models[table].destroy({
      where: {
        [field]: value
      }
    });

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
    let string = req.body.objRaw
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
        return;
      }
    });

    res.json({ msg: 'success', err: false, status: 200 });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error occured', err: true, status: 500, error });
  }
};
