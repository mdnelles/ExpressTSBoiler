import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import compressFilter from './utils/compressFilter.util';
import { authRouter, passwordRouter, verifyEmailRouter } from './routes/v1';
import { hasValidHeader } from './middleware/hasValidHeader';
import * as mysql from './routes/v1/mysql.routes';
import * as file from './routes/v1/file.route';
import isAuth from './middleware/isAuth';
import { errorHandler } from './middleware/errorHandler';
import config from './config/config';
import authLimiter from './middleware/authLimiter';
import { xssMiddleware } from './middleware/xssMiddleware';
import path from 'path';

const app: Express = express();

// Helmet is used to secure this app by configuring the http-header
app.use(helmet());

// parse json request body
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
  app.use('/api/v1/auth', authLimiter);
}

app.use('/api/v1/auth', authRouter);
app.use('/api/v1', passwordRouter);
app.use('/api/v1', verifyEmailRouter);

// mysql routes
app.use('/api/query/insertOne', mysql.insertOne);
app.use('/api/query/selectAll', mysql.selectAll);
app.use('/api/query/selectOne', mysql.selectOne);
app.use('/api/query/selecFields', mysql.selectFields);
app.use('/api/query/updateOne', mysql.updateOne);
app.use('/api/query/deleteOne', mysql.deleteOne);
app.use('/api/query/deleteAll', mysql.deleteAll);
app.use('/api/query/createTableByData', mysql.createTableByData);

// file CRUD
app.use('/api/query/insert', hasValidHeader, file.insertOne);
app.use('/api/query/read', file.selectAll);
app.use('/api/query/delete', file.deleteOne);
app.use('/api/query/update', file.updateOne);

app.use('/api/query/initMapsMySQL', mysql.initMapsMySQL);
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
