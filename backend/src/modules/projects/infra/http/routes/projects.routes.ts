import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import userProjectsRouter from './userProjects.routes';

import ProjectsController from '../controllers/ProjectsController';

const projectsController = new ProjectsController();

const projectsRouter = Router();

projectsRouter.use('/', userProjectsRouter);

projectsRouter.use(ensureAuthenticated);
projectsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      url: Joi.string().required(),
    },
  }),
  projectsController.create,
);

export default projectsRouter;
