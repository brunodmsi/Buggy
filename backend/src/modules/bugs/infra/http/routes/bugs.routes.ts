import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import BugController from '../controllers/BugsController';
import BugDateController from '../controllers/BugDateController';

const bugsRouter = Router();

const bugController = new BugController();
const bugDateController = new BugDateController();

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

bugsRouter.patch(
  '/:bug_id/date',
  celebrate({
    [Segments.BODY]: {
      date: Joi.date().required(),
    },
    [Segments.PARAMS]: {
      bug_id: Joi.string().uuid().required(),
    },
  }),
  bugDateController.update,
);

export default bugsRouter;
