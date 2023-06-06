// import necessary modules and functions
import { insertOne } from '../../src/routes/v1/queries';
const sqlite3 = require('sqlite3');
import { db } from '../../src/routes/db/config';

describe('insertOne', () => {
  it('should insert a row into the database', async () => {
    const req = {
      body: {
        table: 'artists',
        field: '"Name"',
        value: '"Example Jester"'
      }
    };
    const res = {
      json: jest.fn()
    };

    await insertOne(req, res);

    expect(res.json).toHaveBeenCalledWith({
      msg: 'success',
      err: false,
      status: 200,
      rows: []
    });
  });

  it('should return an error if the query fails', async () => {
    const req = {
      body: {
        table: 'artists',
        field: '"Name"',
        value: '"Example Jester"'
      }
    };
    const res = {
      json: jest.fn()
    };

    // db.all.mockImplementationOnce(() => {
    //   throw new Error('Error inserting row');
    // });

    await insertOne(req, res);

    expect(res.json).toHaveBeenCalledWith({
      msg: 'error',
      err: true,
      status: 500,
      error: 'Error inserting row'
    });
  });
});
