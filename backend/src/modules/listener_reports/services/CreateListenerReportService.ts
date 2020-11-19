import { injectable, inject } from 'tsyringe';

import IListenerReportsRepository from '../repositories/IListenerReportsRepository';

import ListenerReport from '../infra/typeorm/entities/ListenerReport';

interface IRequest {
  name: string;
  message: string;
  stack_where: string;
  stack_line: string;
}

@injectable()
class CreateListenerReportService {
  constructor(
    @inject('ListenerReportsRepository')
    private listenerReportsRepository: IListenerReportsRepository,
  ) {}

  public async execute({
    name,
    message,
    stack_where,
    stack_line,
  }: IRequest): Promise<ListenerReport> {
    const listenerReport = await this.listenerReportsRepository.create({
      name,
      message,
      stack_line,
      stack_where,
    });

    return listenerReport;
  }
}

export default CreateListenerReportService;
