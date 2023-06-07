import { db } from '../db/config';
import { createModelsMySQL } from '../init/doModelsMySQL';
import express from 'express';

export const insertOne = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { table, field, value } = req.body;
    const data = await db.sequelize.query(
      `INSERT INTO ${table} (${field}) VALUES (${value})`
    );
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
    (async () => {
      const tmp = await createModelsMySQL(dbname, res);
      console.log(tmp);
    })();
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
    const data = await db.sequelize.query(
      `SELECT * FROM ${table} LIMIT ${limit} `
    );
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

export const updateOne = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { table, field, value, where } = req.body;
    const data = await db.sequelize.query(
      `UPDATE ${table} SET ${field} = '${value}' WHERE ${where} `
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
    const data = await db.sequelize.query(
      `DELETE FROM ${table} WHERE ${field} = '${value}' `
    );

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
    const data = db.sequelize.query(`DELETE FROM ${table}`);
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
  const { table } = req.body;
  console.log(table);
  try {
    for (let i = 0; i <= 5; i++) {
      (async () => {
        try {
          let sql = `INSERT INT EMployees VALUES (${i},'name ${i}','Manager','888${i}',${i} main street', ${new Date()} ) `;
          const data = db.sequelize.query(sql);
          res.json({ msg: 'success', err: false, status: 200, data });
        } catch (error) {
          console.error(error);
          res.json({ msg: 'error', err: true, status: 500, error });
        }
      })();
      res.json({ msg: 'success', err: false, status: 200 });
    }
  } catch (error) {
    res.json({ msg: 'error occured', err: true, status: 500, error });
  }
};
