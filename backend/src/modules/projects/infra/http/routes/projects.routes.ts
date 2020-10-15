import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProjectsController from '../controllers/ProjectsController';

const projectsController = new ProjectsController();

const projectsRouter = Router();

projectsRouter.use(ensureAuthenticated);
projectsRouter.post('/', projectsController.create);

export default projectsRouter;
