import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import UserDashboardController from '../controllers/UserDashboardController';
import ConfirmEmailController from '../controllers/ConfirmEmailController';
import ResendConfirmEmailController from '../controllers/ResendConfirmEmailController';

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const userDashboardController = new UserDashboardController();
const confirmEmailController = new ConfirmEmailController();
const resendConfirmUserEmailService = new ResendConfirmEmailController();

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

usersRouter.post('/confirm-email', confirmEmailController.create);
usersRouter.post(
  '/resend-confirm-email',
  ensureAuthenticated,
  resendConfirmUserEmailService.create,
);

export default usersRouter;
