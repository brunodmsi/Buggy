import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import BugsController from '../controllers/BugsController';
import BugDateController from '../controllers/BugDateController';
import BugGroupController from '../controllers/BugGroupController';
import BugDescriptionController from '../controllers/BugDescriptionController';
import BugTitleController from '../controllers/BugTitleController';
import BugDeliveredController from '../controllers/BugDeliveredController';
import ListBugController from '../controllers/ListBugController';

const bugsRouter = Router();

const bugController = new BugsController();
const bugDateController = new BugDateController();
const listBugController = new ListBugController();
const bugGroupController = new BugGroupController();
const bugDescriptionController = new BugDescriptionController();
const bugTitleController = new BugTitleController();
const bugDeliveredController = new BugDeliveredController();

bugsRouter.get('/:bug_id', listBugController.index);

bugsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      type: Joi.string().required(),
      group: Joi.number().required(),
      status: Joi.number().required(),
      project_id: Joi.string().uuid().required(),
    },
  }),
  bugController.create,
);

bugsRouter.delete(
  '/:bug_id',
  celebrate({
    [Segments.PARAMS]: {
      bug_id: Joi.string().uuid().required(),
    },
  }),
  bugController.destroy,
);

bugsRouter.patch(
  '/:bug_id/date',
  celebrate({
    [Segments.BODY]: {
      date_limit: Joi.date().required(),
    },
    [Segments.PARAMS]: {
      bug_id: Joi.string().uuid().required(),
    },
  }),
  bugDateController.update,
);

bugsRouter.patch(
  '/:bug_id/group',
  celebrate({
    [Segments.BODY]: {
      new_group: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      bug_id: Joi.string().uuid().required(),
    },
  }),
  bugGroupController.update,
);

bugsRouter.patch(
  '/:bug_id/description',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      bug_id: Joi.string().uuid().required(),
    },
  }),
  bugDescriptionController.update,
);

bugsRouter.patch(
  '/:bug_id/title',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      bug_id: Joi.string().uuid().required(),
    },
  }),
  bugTitleController.update,
);

bugsRouter.patch(
  '/:bug_id/delivered',
  celebrate({
    [Segments.BODY]: {
      delivered: Joi.boolean().required(),
    },
    [Segments.PARAMS]: {
      bug_id: Joi.string().uuid().required(),
    },
  }),
  bugDeliveredController.update,
);

export default bugsRouter;
