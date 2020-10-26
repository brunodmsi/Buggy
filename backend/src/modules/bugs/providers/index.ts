import { container } from 'tsyringe';

import IBugsRepository from '../repositories/IBugsRepository';
import BugsRepository from '../infra/typeorm/repositories/BugsRepository';

container.registerSingleton<IBugsRepository>('BugsRepository', BugsRepository);
