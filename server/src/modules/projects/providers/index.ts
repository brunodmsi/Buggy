import { container } from 'tsyringe';

import IProjectsRepository from '../repositories/IProjectsRepository';
import ProjectsRepository from '../infra/typeorm/repositories/ProjectsRepository';

import IUserProjectsRepository from '../repositories/IUserProjectsRepository';
import UserProjectsRepository from '../infra/typeorm/repositories/UserProjectsRepository';

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
);

container.registerSingleton<IUserProjectsRepository>(
  'UserProjectsRepository',
  UserProjectsRepository,
);
