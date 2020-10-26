import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import BugController from '../controllers/BugsController';

const bugsRouter = Router();

const bugController = new BugController();

bugsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      type: Joi.string().required(),
      group: Joi.number().required(),
      status: Joi.number().required(),
    },
  }),
  bugController.create,
);

export default bugsRouter;
