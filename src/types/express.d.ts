import type { JwtPayload } from 'jsonwebtoken';

import { type Request, type Response } from 'express';
declare global {
  namespace Express {
    export interface Request {
      payload?: JwtPayload;

      cookies: {
        jid?: string;
      };
    }
  }
}

// Create custom types for request and response
export type Req = Request;
export type Res = Response;
