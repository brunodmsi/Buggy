import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ListDeveloperBugsController from '../controllers/ListDeveloperBugsController';
import ListBugDevelopersController from '../controllers/ListBugDevelopersController';
import BugDeveloperController from '../controllers/BugDeveloperController';

const bugDevelopersRouter = Router();

const listDeveloperBugsController = new ListDeveloperBugsController();
const listBugDevelopersController = new ListBugDevelopersController();
const bugDeveloperController = new BugDeveloperController();

bugDevelopersRouter.get(
  '/developers/:user_id',
  listDeveloperBugsController.index,
);

bugDevelopersRouter.get(
  '/:bug_id/developers',
  listBugDevelopersController.index,
);

bugDevelopersRouter.post(
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

export default bugDevelopersRouter;
