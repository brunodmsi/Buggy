import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import BugListenerReportController from '../controllers/BugListenerReportController';

const listenerReportsRouter = Router();

const bugListenerReportController = new BugListenerReportController();

listenerReportsRouter.post(
  '/express',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      message: Joi.string().required(),
      type: Joi.string().required(),
      stack_line: Joi.string().required(),
      stack_where: Joi.string().required(),
      listener_key: Joi.string().uuid().required(),
    },
  }),
  bugListenerReportController.create,
);

export default listenerReportsRouter;
