import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import routes from './routes';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());

app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`🤘 Server running on port ${port}`));
