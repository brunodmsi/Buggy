import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import BugController from '../controllers/BugsController';

const bugsRouter = Router();

const bugController = new BugController();

bugsRouter.use(ensureAuthenticated);
bugsRouter.post('/', bugController.create);

export default bugsRouter;
