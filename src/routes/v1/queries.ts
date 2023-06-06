import { db } from '../db/config';
import { createModels } from '../init/doModelsSQLite';

export const insertOne = (req: any, res: any) => {
  console.log(req.body);
  const { table, field, value } = req.body;
  const query = `INSERT INTO ${table} (${field}) VALUES (${value})`;
  console.log(query);
  db.all(query, (error, rows) => {
    if (error) {
      res.json({ msg: 'error', err: true, status: 500, error });
    } else {
      console.log(rows);
      res.json({ msg: 'success', err: false, status: 200, rows });
    }
  });
};

export const selectAll = (req: any, res: any) => {
  const { table, limit = 10 } = req.body;
  db.all(`SELECT * FROM ${table} LIMIT ${limit} `, (error, rows) => {
    if (error) {
      console.error(error);
      res.json({ msg: 'error', err: true, status: 500, error });
    } else {
      console.log(rows);
      res.json({ msg: 'success', err: false, status: 200, rows });
    }
  });
};

export const selectOne = (req: any, res: any) => {
  const { table, field, value } = req.body;
  db.all(
    `SELECT * FROM ${table} WHERE ${field} = '${value}' `,
    (error, rows) => {
      if (error) {
        console.error(error);
        res.json({ msg: 'error', err: true, status: 500, error });
      } else {
        console.log(rows);
        res.json({ msg: 'success', err: false, status: 200, rows });
      }
    }
  );
};

export const updateOne = (req: any, res: any) => {
  const { table, field, value, where } = req.body;
  db.all(
    `UPDATE ${table} SET ${field} = '${value}' WHERE ${where} `,
    (error, rows) => {
      if (error) {
        console.error(error);
        res.json({ msg: 'error', err: true, status: 500, error });
      } else {
        console.log(rows);
        res.json({ msg: 'success', err: false, status: 200, rows });
      }
    }
  );
};

export const deleteOne = (req: any, res: any) => {
  const { table, field, value } = req.body;
  db.all(`DELETE FROM ${table} WHERE ${field} = '${value}' `, (error, rows) => {
    if (error) {
      console.error(error);
      res.json({ msg: 'error', err: true, status: 500, error });
    } else {
      console.log(rows);
      res.json({ msg: 'success', err: false, status: 200, rows });
    }
  });
};

export const deleteAll = (req: any, res: any) => {
  const { table } = req.body;
  db.all(`DELETE FROM ${table}`, (error, rows) => {
    if (error) {
      console.error(error);
      res.json({ msg: 'error', err: true, status: 500, error });
    } else {
      console.log(rows);
      res.json({ msg: 'success', err: false, status: 200, rows });
    }
  });
};

export const initMaps = (req: any, res: any) => {
  try {
    const { dbname = '' } = req.body;
    (async () => {
      const tmp = await createModels(dbname, res);
      console.log(tmp);
    })();
  } catch (error) {
    res.json({ msg: 'error occured', err: true, status: 500, error });
  }
};
