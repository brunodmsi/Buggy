import { container } from 'tsyringe';

import IListenerReportRepository from '../repositories/IListenerReportsRepository';
import ListenerReportsRepository from '../infra/typeorm/repositories/ListenerReportsRepository';

container.registerSingleton<IListenerReportRepository>(
  'ListenerReportsRepository',
  ListenerReportsRepository,
);
