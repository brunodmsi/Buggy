import { Router } from 'express';

import ProjectsController from '../controllers/ProjectsController';

const projectsController = new ProjectsController();

const projectsRouter = Router();

projectsRouter.post('/', projectsController.create);

export default projectsRouter;
