import type { Request, Response } from 'express';
import { selectAll } from '../../src/routes/v1/file.route';
import { ParsedQs } from 'qs';

describe('selectAll function', () => {
  let res: Response;

  beforeEach(() => {
    res = {
      json: jest.fn()
    } as unknown as Response;
  });

  it('should send a success response with the data', async () => {
    const req = {} as Request<any, any, any, ParsedQs>;

    const data = [
      { id: 1, name: 'Ford', year: 2025 },
      { id: 2, name: 'Chevy', year: 2025 },
      { id: 3, name: 'Tesla', year: 2020 },
      { id: 4, name: 'KIA', year: 2025 },
      { id: 5, name: 'Honda', year: 2019 },
      { id: 7, name: 'Nissan', year: 2018 }
      // Add more records if needed
    ];

    await selectAll(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        msg: 'success',
        err: false,
        status: 200,
        data: expect.arrayContaining(data)
      })
    );
  });

  it('should handle errors and send an error response', async () => {
    const req = {} as Request<any, any, any, ParsedQs>;
    const errorMessage = 'Something went wrong';
    const error = new Error(errorMessage);

    jest.spyOn(console, 'error').mockImplementationOnce(() => {});

    jest.spyOn(res, 'json').mockImplementationOnce(() => {
      throw error;
    });

    await selectAll(req, res);

    expect(console.error).toHaveBeenCalledWith(error);
    expect(res.json).toHaveBeenCalledWith({
      msg: 'error',
      err: true,
      status: 500,
      error: errorMessage
    });

    jest.spyOn(console, 'error').mockRestore();
    jest.spyOn(res, 'json').mockRestore();
  });
});
