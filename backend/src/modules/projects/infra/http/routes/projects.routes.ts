import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProjectsController from '../controllers/ProjectsController';
import UserProjectController from '../controllers/UserProjectController';

const projectsController = new ProjectsController();
const userProjectController = new UserProjectController();

const projectsRouter = Router();

projectsRouter.use(ensureAuthenticated);
projectsRouter.post('/', projectsController.create);

projectsRouter.post('/:project_id/users', userProjectController.create);

export default projectsRouter;
