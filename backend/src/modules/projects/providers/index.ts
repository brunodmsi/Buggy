import { container } from 'tsyringe';

import IProjectsRepository from '../repositories/IProjectsRepository';
import ProjectsRepository from '../infra/typeorm/repositories/ProjectsRepository';

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
);
