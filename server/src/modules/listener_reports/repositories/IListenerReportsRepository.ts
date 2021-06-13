import ListenerReport from '../infra/typeorm/entities/ListenerReport';

import ICreateListenerReportDTO from '../dtos/ICreateListenerReportDTO';

export default interface IListenerReportRepository {
  findById(id: string): Promise<ListenerReport | undefined>;

  create(data: ICreateListenerReportDTO): Promise<ListenerReport>;
  save(listenerReport: ListenerReport): Promise<ListenerReport>;
}
