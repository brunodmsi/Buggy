import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import bugDevelopersRouter from './bugDevelopers.routes';
import bugsRouter from './bugs.routes';

const router = Router();

router.use(ensureAuthenticated);
router.use('/', bugDevelopersRouter);
router.use('/', bugsRouter);

export default router;
