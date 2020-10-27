import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import bugDevelopersRouter from './bugDevelopers.routes';
import bugCommentsRouter from './bugComments.routes';
import bugChecklistsRouter from './bugChecklists.routes';
import bugFilesRouter from './bugFiles.routes';
import bugsRouter from './bugs.routes';

const router = Router();

router.use(ensureAuthenticated);
router.use('/', bugDevelopersRouter);
router.use('/', bugCommentsRouter);
router.use('/', bugChecklistsRouter);
router.use('/', bugsRouter);
router.use('/', bugFilesRouter);

export default router;
