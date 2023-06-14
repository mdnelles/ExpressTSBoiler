import type { Request, Response } from 'express';
import { insertOne } from '../../src/routes/v1/file.route';

describe('insertOne function', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;
    res = {
      json: jest.fn()
    } as unknown as Response;
  });

  it('should insert the new data and send a success response', async () => {
    req.body = {
      newData: '{"name": "John Doe", "age": 25}'
    };

    await insertOne(req, res);

    expect(res.json).toHaveBeenCalledWith({
      msg: 'success',
      err: false,
      status: 200
    });
  });

  it('should handle errors and send an error response', async () => {
    const errorMessage = 'Something went wrong';
    const error = new Error(errorMessage);

    req.body = {
      newData: '{"name": "John Doe", "age": 25}'
    };

    jest.spyOn(console, 'error').mockImplementationOnce(() => {
      console.log(new Date());
    });

    jest.spyOn(JSON, 'parse').mockImplementationOnce(() => {
      throw error;
    });

    await insertOne(req, res);

    expect(console.error).toHaveBeenCalledWith(error);
    expect(res.json).toHaveBeenCalledWith({
      msg: 'error',
      err: true,
      status: 500,
      error: errorMessage
    });

    jest.spyOn(console, 'error').mockRestore();
    jest.spyOn(JSON, 'parse').mockRestore();
  });
});
