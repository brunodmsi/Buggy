import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import BugController from '../controllers/BugsController';
import BugDeveloperController from '../controllers/BugDeveloperController';

const bugsRouter = Router();

const bugController = new BugController();
const bugDeveloperController = new BugDeveloperController();

bugsRouter.use(ensureAuthenticated);
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

bugsRouter.post(
  '/:bug_id/developers',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
    },
    [Segments.PARAMS]: {
      bug_id: Joi.string().uuid().required(),
    },
  }),
  bugDeveloperController.create,
);

export default bugsRouter;
