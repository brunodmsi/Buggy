import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersInProjectController from '../controllers/UsersInProjectController';

const usersInProjectController = new UsersInProjectController();

const userProjectsRouter = Router();

userProjectsRouter.use(ensureAuthenticated);

userProjectsRouter.get('/:project_id/users', usersInProjectController.index);
// userProjectsRouter.get('/users/:user_id', usersInProjectController.index);

export default userProjectsRouter;
