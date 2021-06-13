import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

import projectsRouter from '@modules/projects/infra/http/routes';
import bugsRouter from '@modules/bugs/infra/http/routes';
import listenerReportsRouter from '@modules/listener_reports/infra/http/routes/listenerReports.routes';

const router = Router();

router.use('/projects', projectsRouter);
router.use('/bugs', bugsRouter);

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);
router.use('/profile', profileRouter);
router.use('/password', passwordRouter);

router.use('/listeners', listenerReportsRouter);

export default router;
