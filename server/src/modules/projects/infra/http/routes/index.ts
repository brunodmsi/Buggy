import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import projectsRouter from '@modules/projects/infra/http/routes/projects.routes';
import userProjects from '@modules/projects/infra/http/routes/userProjects.routes';
import projectBugs from '@modules/projects/infra/http/routes/projectBugs.routes';

const projectsRouterGroup = Router();

projectsRouterGroup.use(ensureAuthenticated);

projectsRouterGroup.use('/', projectsRouter);
projectsRouterGroup.use('/', projectBugs);
projectsRouterGroup.use('/', userProjects);

export default projectsRouterGroup;
