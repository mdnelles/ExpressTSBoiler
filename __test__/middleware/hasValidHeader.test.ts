import httpStatus from 'http-status';
import type { Request, Response } from 'express';
import { hasValidHeader } from '../../src/middleware/hasValidHeader';

describe('hasValidHeader middleware', () => {
  let req: Request;
  let res: Response;
  let next: jest.Mock;

  beforeEach(() => {
    req = {} as Request;
    res = {
      sendStatus: jest.fn()
    } as unknown as Response;
    next = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call next if the request has a valid x-req-api header', () => {
    req.headers = {
      'x-req-api': 'x-req-api'
    };

    hasValidHeader(req, res, next);

    expect(res.sendStatus).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should send UNAUTHORIZED status if the request does not have x-req-api header', () => {
    req.headers = {};

    hasValidHeader(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(httpStatus.UNAUTHORIZED);
    expect(next).not.toHaveBeenCalled();
  });

  it('should send UNAUTHORIZED status if the request has an invalid x-req-api header', () => {
    req.headers = {
      'x-req-api': 'invalid-header'
    };

    hasValidHeader(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(httpStatus.UNAUTHORIZED);
    expect(next).not.toHaveBeenCalled();
  });
});
