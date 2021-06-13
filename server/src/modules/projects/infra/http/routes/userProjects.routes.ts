import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersInProjectController from '../controllers/UsersInProjectController';
import UserProjectController from '../controllers/UserProjectController';
import UserProjectsController from '../controllers/UserProjectsController';

const usersInProjectController = new UsersInProjectController();
const userProjectsController = new UserProjectsController();
const userProjectController = new UserProjectController();

const userProjectsRouter = Router();

userProjectsRouter.use(ensureAuthenticated);

userProjectsRouter.get('/:project_id/users', usersInProjectController.index);
userProjectsRouter.get('/users/:user_id', userProjectsController.index);

userProjectsRouter.post('/:project_id/users', userProjectController.create);

export default userProjectsRouter;
