import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import path from 'path';
import compressFilter from './utils/compressFilter.util';

import config from './config/config';
// custom middleware
import errorHandler from './middleware/errorHandler';
import isAuth from './middleware/isAuth';
import hasValidHeader from './middleware/hasValidHeader';
import xssMiddleware from './middleware/xssMiddleware';
import authLimiter from './middleware/authLimiter';
// custom routes
import * as rt from './routes';
import * as mysql from './routes/mysql.routes';
import * as file from './routes/file.route';

const app: Express = express();

app.use(helmet());
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(xssMiddleware());
app.use(cookieParser());

// Compression is used to reduce the size of the response body
app.use(compression({ filter: compressFilter }));

app.use(
  cors({
    // origin is given a array if we want to have multiple origins later
    origin: String(config.cors.cors_origin).split('|'),
    credentials: true
  })
);

if (config.node_env === 'production') {
  app.use('/api/auth', authLimiter);
}

app.use('/api/auth', rt.authRouter);
app.use('/api/pw', rt.passwordRouter);
app.use('/api/v1', rt.verifyEmailRouter);

// mysql routes
app.use('/api/query/insertOne', mysql.insertOne);
app.use('/api/query/selectAll', mysql.selectAll);
app.use('/api/query/selectOne', mysql.selectOne);
app.use('/api/query/selectFields', mysql.selectFields);
app.use('/api/query/updateOne', mysql.updateOne);
app.use('/api/query/deleteOne', mysql.deleteOne);
app.use('/api/query/deleteAll', mysql.deleteAll);
app.use('/api/query/joinSQL', mysql.joinSQL);
app.use('/api/query/createTableByData', mysql.createTableByData);

// file CRUD
app.use('/api/query/insert', hasValidHeader, file.insertOne);
app.use('/api/query/read', file.selectAll);
app.use('/api/query/delete', file.deleteOne);
app.use('/api/query/update', file.updateOne);

// init functions
app.use('/api/query/initModelsMySQL', mysql.initModelsMySQL);
app.use('/api/query/populate', mysql.insertData);

app.get('/secret', isAuth, (_req, res) => {
  res.json({
    message: 'You can see me'
  });
});

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

export default app;
