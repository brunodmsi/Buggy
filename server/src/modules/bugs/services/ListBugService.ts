import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Bug from '@modules/bugs/infra/typeorm/entities/Bug';
import IListenerReportsRepository from '@modules/listener_reports/repositories/IListenerReportsRepository';
import IBugsRepository from '../repositories/IBugsRepository';

interface IRequest {
  bug_id: string;
}

@injectable()
class ListBugService {
  constructor(
    @inject('BugsRepository')
    private bugsRepository: IBugsRepository,
    @inject('ListenerReportsRepository')
    private listenerReportsRepository: IListenerReportsRepository,
  ) {}

  public async execute({ bug_id }: IRequest): Promise<Bug> {
    const bug = await this.bugsRepository.findById(bug_id);

    if (!bug) {
      throw new AppError('Bug not found');
    }

    const listenerReport = await this.listenerReportsRepository.findById(
      bug.listener_report_id,
    );

    if (listenerReport) {
      bug.listener_report = listenerReport;
    }

    bug.comments = bug.comments.sort(
      (first, second) =>
        new Date(second.created_at).getTime() -
        new Date(first.created_at).getTime(),
    );

    return bug;
  }
}

export default ListBugService;
