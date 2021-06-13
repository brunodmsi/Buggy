import { uuid } from 'uuidv4';

import IListenerReportsRepository from '@modules/listener_reports/repositories/IListenerReportsRepository';
import ICreateListenerReportDTO from '@modules/listener_reports/dtos/ICreateListenerReportDTO';

import ListenerReport from '@modules/listener_reports/infra/typeorm/entities/ListenerReport';

class FakeListenerReportRepository implements IListenerReportsRepository {
  private listenerReports: ListenerReport[] = [];

  public async findById(id: string): Promise<ListenerReport | undefined> {
    const findListenerReport = this.listenerReports.find(
      listenerReport => listenerReport.id === id,
    );

    return findListenerReport;
  }

  public async create(
    listenerReportData: ICreateListenerReportDTO,
  ): Promise<ListenerReport> {
    const listenerReport = new ListenerReport();

    Object.assign(
      listenerReport,
      { id: uuid(), listener_key: uuid() },
      listenerReportData,
    );

    this.listenerReports.push(listenerReport);

    return listenerReport;
  }

  public async save(listenerReport: ListenerReport): Promise<ListenerReport> {
    const findIndex = this.listenerReports.findIndex(
      findListenerReport => findListenerReport.id === listenerReport.id,
    );

    this.listenerReports[findIndex] = listenerReport;

    return listenerReport;
  }
}

export default FakeListenerReportRepository;
