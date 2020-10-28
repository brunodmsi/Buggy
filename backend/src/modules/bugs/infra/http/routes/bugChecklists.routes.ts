import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import BugChecklistController from '../controllers/BugChecklistController';
import BugChecklistItemController from '../controllers/BugChecklistItemController';

const bugChecklistRouter = Router();

const bugChecklistController = new BugChecklistController();
const bugChecklistItemController = new BugChecklistItemController();

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

bugChecklistRouter.patch(
  '/checklists/:checklist_id/items',
  celebrate({
    [Segments.BODY]: {
      text: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      checklist_id: Joi.string().uuid().required(),
    },
  }),
  bugChecklistItemController.update,
);

export default bugChecklistRouter;
