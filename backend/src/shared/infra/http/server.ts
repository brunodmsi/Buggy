import 'reflect-metadata';
import 'dotenv/config';

import AppError from '@shared/errors/AppError';
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import * as buggyListener from 'buggy-listener-express';

import uploadConfig from '@config/upload';

import routes from './routes';
import rateLimiter from './middlewares/rateLimiter';
import errorHandler from './middlewares/errorHandler';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

buggyListener.init({
  dsn: 'ec8f8440-3d8e-4a75-ad66-5a62782f2caf',
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

app.use(buggyListener.requestError({ notInstanceOf: AppError }));

app.use(errors());
app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`🤘 Server running on port ${port}`));
