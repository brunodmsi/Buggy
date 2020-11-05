import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import UserDashboardController from '../controllers/UserDashboardController';

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const userDashboardController = new UserDashboardController();

const upload = multer(uploadConfig.multer);

const usersRouter = Router();

usersRouter.get(
  '/dashboard',
  ensureAuthenticated,
  userDashboardController.index,
);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
