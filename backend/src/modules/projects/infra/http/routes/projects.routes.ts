import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import userProjectsRouter from './userProjects.routes';

import ProjectsController from '../controllers/ProjectsController';

const projectsController = new ProjectsController();

const projectsRouter = Router();

projectsRouter.use('/', userProjectsRouter);

projectsRouter.use(ensureAuthenticated);
projectsRouter.post('/', projectsController.create);

export default projectsRouter;
