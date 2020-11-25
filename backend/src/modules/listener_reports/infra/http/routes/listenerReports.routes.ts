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
      error_query: Joi.any(),
      type: Joi.string().required(),
      stack_line: Joi.string().required(),
      stack_where: Joi.string().required(),
      request_body: Joi.any(),
      request_method: Joi.string().required(),
      request_url: Joi.string().required(),
      request_url_path: Joi.string().required(),
      request_headers: Joi.string().required(),
      request_query: Joi.string().required(),
      request_params: Joi.string().required(),
      listener_key: Joi.string().uuid().required(),
    },
  }),
  bugListenerReportController.create,
);

export default listenerReportsRouter;
