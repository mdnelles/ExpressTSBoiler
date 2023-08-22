import { db } from '../config/dbconfig';
import Sequelize from 'sequelize';
import { createModelsMySQL } from './init/doModelsMySQL';
import { generateDummyDataString } from '../utils/generateDummy';
import {
  generateDeleteQuery,
  generateInsertQuery,
  generateJoinQuery,
  generateSQLFunctionQuery,
  generateUpdateQuery,
  selectMulitpleFieldsQuery
} from '../utils/generateSQL';

import { type Req, type Res } from '../types/express';

import { type ModelsIndex } from 'src/types/models';
import * as allModels from '../models';

import dotenv from 'dotenv';
import {
  firstToUpper,
  noModel,
  onlyFirstIsUpper,
  tableExists
} from '../utils/generalFunctions';
const models: ModelsIndex = allModels;
const env = dotenv.config().parsed;
const dbs = db.sequelize;

export const selectAll = async (req: Req, res: Res) => {
  const { limit = 10 } = req.body;

  try {
    if (!models[firstToUpper(req.body.table)]) {
      throw new Error(noModel(req.body.table));
    }
    const table = onlyFirstIsUpper(req.body.table);
    console.log(`SELECT * FROM ${table} LIMIT ${limit};`); // display SQL
    const data = await models[firstToUpper(table)].findAll({
      limit: parseInt(limit as string, 10)
    });

    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const insertOne = async (req: Req, res: Res) => {
  try {
    const { values } = req.body;

    if (!tableExists(req.body.table, models)) { throw new Error(noModel(req.body.table)); }
    const table = onlyFirstIsUpper(req.body.table);
    const valuesParsed = JSON.parse(values);
    console.log(generateInsertQuery(table, valuesParsed)); // display SQL

    const data = await models[table].create(valuesParsed);
    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.log(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const selectOne = async (req: Req, res: Res) => {
  try {
    const { field, value } = req.body;
    if (!tableExists(req.body.table, models)) { throw new Error(noModel(req.body.table)); }
    const table = onlyFirstIsUpper(req.body.table);

    console.log(`SELECT * FROM ${table} WHERE ${field} = '${value}' LIMIT 1;`);
    const data = await models[table].findOne({
      where: { [field]: value }
    });
    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const selectFields = async (req: Req, res: Res) => {
  try {
    if (!tableExists(req.body.table, models)) { throw new Error(noModel(req.body.table)); }
    const table = onlyFirstIsUpper(req.body.table);
    const { attributes, limit = 10, likeOperator = false } = req.body;

    const attributesParsed =
      typeof attributes === 'string' ? JSON.parse(attributes) : attributes;

    console.log(
      selectMulitpleFieldsQuery(table, attributesParsed, limit, likeOperator)
    );
    const data = await models[table].findAll({
      where: attributesParsed
    });
    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const updateOne = async (req: Req, res: Res) => {
  try {
    if (!tableExists(req.body.table, models)) { throw new Error(noModel(req.body.table)); }
    const table = onlyFirstIsUpper(req.body.table);

    const { updateField, updateValue, whereCondition } = req.body;
    const data = dbs.query(
      generateUpdateQuery(table, updateField, updateValue, whereCondition),
      dbs.QueryTypes.UPDATE
    );

    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const deleteOne = async (req: Req, res: Res) => {
  try {
    if (!tableExists(req.body.table, models)) { throw new Error(noModel(req.body.table)); }
    const table = onlyFirstIsUpper(req.body.table);

    const { field, value } = req.body;
    console.log(generateDeleteQuery(table, field, value));
    const data = await models[table].destroy({ where: { [field]: value } });

    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const deleteAll = async (req: Req, res: Res) => {
  try {
    if (!tableExists(req.body.table, models)) { throw new Error(noModel(req.body.table)); }
    const table = onlyFirstIsUpper(req.body.table);
    const data = dbs.models[table].destroy({
      truncate: true
    });
    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};

export const insertData = async (req: Req, res: Res) => {
  const { dbname } = req.body;
  try {
    const tableNames = await dbs.query(`SHOW TABLES FROM ${dbname} `, {
      type: Sequelize.QueryTypes.SHOWTABLES
    });
    tableNames.map(async (tableName: any) => {
      // Retrieve column information for the current table
      const columns = await dbs.query(
        `SHOW COLUMNS FROM ${dbname}.${tableName}`,
        dbs.QueryTypes.SHOWCOLUMNS
      );

      // Generate dummy data based on data types and insert 5 items
      const obj = generateDummyDataString(columns[0]);
      await dbs.query(
        `INSERT INTO ${tableName} (${obj.cols}) VALUES (${obj.vals}); `,
        dbs.QueryTypes.INSERT
      );
    });

    res.json({ msg: 'success', err: false, status: 200 });
  } catch (error) {
    res.json({ msg: 'error occured', err: true, status: 500, error });
  }
};

export const createTableByData = async (req: Req, res: Res) => {
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

    await dbs.query(`DROP TABLE IF EXISTS ${tableName};`);
    await dbs.query(createTableQuery);

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
        await dbs.query(insertQuery, {
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

export const joinSQL = async (req: Req, res: Res) => {
  try {
    if (!models[firstToUpper(req.body.table1)]) { throw new Error(noModel(req.body.table1)); }

    if (!models[firstToUpper(req.body.table2)]) { throw new Error(noModel(req.body.table2)); }

    const table1 = onlyFirstIsUpper(req.body.table1);
    const table2 = onlyFirstIsUpper(req.body.table2);

    const { table1Column, table2Column } = req.body;
    console.log(generateJoinQuery(table1, table2, table1Column, table2Column));

    console.log(table1, table2);
    // const data = await
    models[table1].hasMany(models[table2], {
      foreignKey: table2Column,
      sourceKey: table1Column
    });
    models[table2].belongsTo(models[table1], {
      foreignKey: table2Column,
      targetKey: table1Column
    });

    const data = await models[table1].findAll({
      include: [
        {
          model: models[table2],
          required: true // this makes the join INNER rather than LEFT OUTER
        }
      ]
    });

    res.json({ msg: 'success', err: false, status: 200, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while joining tables' });
  }
};

export const functionSQL = async (req: Req, res: Res) => {
  try {
    const { functionName, columnName, alias, groupByColumn } = req.body;

    const sqlQuery = generateSQLFunctionQuery(
      functionName,
      columnName,
      alias,
      groupByColumn
    );
    const results = await dbs.query(sqlQuery, {
      type: dbs.QueryTypes.SELECT
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while joining tables' });
  }
};

export const initModelsMySQL = async (req: Req, res: Res) => {
  try {
    const envdb = env && env['MYSQLDB'] ? env['MYSQLDB'] : 'test';
    const dbname = req.body.dbname || envdb;
    const tmp = await createModelsMySQL(dbname, res);
    console.log(tmp);
  } catch (error) {
    console.log(error);
    res.json({ msg: 'error', err: true, status: 500, error });
  }
};
