import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProjectBugsController from '../controllers/ProjectBugsController';

const projectBugsController = new ProjectBugsController();

const projectBugsRouter = Router();

projectBugsRouter.use(ensureAuthenticated);

projectBugsRouter.get('/:project_id/bugs', projectBugsController.index);

export default projectBugsRouter;
