import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import BugCommentController from '../controllers/BugCommentController';

const bugCommentsRouter = Router();

const bugCommentController = new BugCommentController();

bugCommentsRouter.post(
  '/:bug_id/comments',
  celebrate({
    [Segments.BODY]: {
      message: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      bug_id: Joi.string().uuid().required(),
    },
  }),
  bugCommentController.create,
);

export default bugCommentsRouter;
