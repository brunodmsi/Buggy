import { Repository, getRepository } from 'typeorm';

import IListenerReportRepository from '@modules/listener_reports/repositories/IListenerReportsRepository';
import ICreateListenerReportDTO from '@modules/listener_reports/dtos/ICreateListenerReportDTO';

import ListenerReport from '@modules/listener_reports/infra/typeorm/entities/ListenerReport';

class ListenerReportsRepository implements IListenerReportRepository {
  private ormRepository: Repository<ListenerReport>;

  constructor() {
    this.ormRepository = getRepository(ListenerReport);
  }

  public async findById(id: string): Promise<ListenerReport | undefined> {
    const project = await this.ormRepository.findOne(id);

    return project;
  }

  public async create(
    listenerReportData: ICreateListenerReportDTO,
  ): Promise<ListenerReport> {
    const listenerReport = this.ormRepository.create(listenerReportData);

    await this.ormRepository.save(listenerReport);

    return listenerReport;
  }

  public async save(listenerReport: ListenerReport): Promise<ListenerReport> {
    return this.ormRepository.save(listenerReport);
  }
}

export default ListenerReportsRepository;
