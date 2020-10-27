import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import BugChecklistController from '../controllers/BugChecklistController';

const bugChecklistRouter = Router();

const bugChecklistController = new BugChecklistController();

bugChecklistRouter.post(
  '/:bug_id/checklists',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      bug_id: Joi.string().uuid().required(),
    },
  }),
  bugChecklistController.create,
);

export default bugChecklistRouter;
