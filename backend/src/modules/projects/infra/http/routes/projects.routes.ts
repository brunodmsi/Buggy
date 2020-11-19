import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import userProjectsRouter from './userProjects.routes';

import ProjectsController from '../controllers/ProjectsController';

const projectsController = new ProjectsController();

const upload = multer(uploadConfig.multer);

const projectsRouter = Router();

projectsRouter.use('/', userProjectsRouter);

projectsRouter.use(ensureAuthenticated);

projectsRouter.get('/:projectId', projectsController.show);

projectsRouter.post(
  '/',
  upload.single('logo'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      url: Joi.string().required(),
      logo: Joi.string(),
    },
  }),
  projectsController.create,
);

export default projectsRouter;
