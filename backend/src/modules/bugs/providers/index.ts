import { container } from 'tsyringe';

import IBugsRepository from '../repositories/IBugsRepository';
import BugsRepository from '../infra/typeorm/repositories/BugsRepository';

import IBugDevelopersRepository from '../repositories/IBugDevelopersRepository';
import BugDevelopersRepository from '../infra/typeorm/repositories/BugDevelopersRepository';

import IBugFilesRepository from '../repositories/IBugFilesRepository';
import BugFilesRepository from '../infra/typeorm/repositories/BugFilesRepository';

container.registerSingleton<IBugsRepository>('BugsRepository', BugsRepository);

container.registerSingleton<IBugDevelopersRepository>(
  'BugDevelopersRepository',
  BugDevelopersRepository,
);

container.registerSingleton<IBugFilesRepository>(
  'BugFilesRepository',
  BugFilesRepository,
);
