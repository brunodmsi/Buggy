import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import BugCommentController from '../controllers/BugCommentController';
import ListBugCommentsController from '../controllers/ListBugCommentsController';

const bugCommentsRouter = Router();

const bugCommentController = new BugCommentController();
const listBugCommentsController = new ListBugCommentsController();

bugCommentsRouter.get('/:bug_id/comments', listBugCommentsController.index);

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

bugCommentsRouter.delete(
  '/:bug_id/comments/:bug_comment_id',
  bugCommentController.destroy,
);

export default bugCommentsRouter;
