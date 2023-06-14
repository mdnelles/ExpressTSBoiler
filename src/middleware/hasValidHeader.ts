// middlewhere that checks if the request has a valid header x-req-api

/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export const validHeader = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check to see  if header x-req-api is present on request
  const header = req.headers['x-req-api'];
  if (!header) return res.sendStatus(httpStatus.UNAUTHORIZED);
  if (header !== 'x-req-api') return res.sendStatus(httpStatus.UNAUTHORIZED);
  next();
};
