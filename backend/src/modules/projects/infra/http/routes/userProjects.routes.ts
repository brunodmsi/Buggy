import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersInProjectController from '../controllers/UsersInProjectController';
import UserProjectsController from '../controllers/UserProjectsController';

const usersInProjectController = new UsersInProjectController();
const userProjectsController = new UserProjectsController();

const userProjectsRouter = Router();

userProjectsRouter.use(ensureAuthenticated);

userProjectsRouter.get('/:project_id/users', usersInProjectController.index);
userProjectsRouter.get('/users/:user_id', userProjectsController.index);

export default userProjectsRouter;
