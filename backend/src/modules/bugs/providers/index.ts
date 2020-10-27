import { container } from 'tsyringe';

import IBugsRepository from '../repositories/IBugsRepository';
import BugsRepository from '../infra/typeorm/repositories/BugsRepository';

import IBugDevelopersRepository from '../repositories/IBugDevelopersRepository';
import BugDevelopersRepository from '../infra/typeorm/repositories/BugDevelopersRepository';

import IBugFilesRepository from '../repositories/IBugFilesRepository';
import BugFilesRepository from '../infra/typeorm/repositories/BugFilesRepository';

import IBugCommentsRepository from '../repositories/IBugCommentsRepository';
import BugCommentsRepository from '../infra/typeorm/repositories/BugCommentsRepository';

import IBugChecklistsRepository from '../repositories/IBugChecklistsRepository';
import BugChecklistsRepository from '../infra/typeorm/repositories/BugChecklistsRepository';

container.registerSingleton<IBugsRepository>('BugsRepository', BugsRepository);

container.registerSingleton<IBugDevelopersRepository>(
  'BugDevelopersRepository',
  BugDevelopersRepository,
);

container.registerSingleton<IBugFilesRepository>(
  'BugFilesRepository',
  BugFilesRepository,
);

container.registerSingleton<IBugCommentsRepository>(
  'BugCommentsRepository',
  BugCommentsRepository,
);

container.registerSingleton<IBugChecklistsRepository>(
  'BugChecklistsRepository',
  BugChecklistsRepository,
);
