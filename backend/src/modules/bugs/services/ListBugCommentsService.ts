import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import BugComment from '@modules/bugs/infra/typeorm/entities/BugComment';
import IBugsRepository from '../repositories/IBugsRepository';
import IBugCommentsRepository from '../repositories/IBugCommentsRepository';

interface IRequest {
  bug_id: string;
}

@injectable()
class ListBugCommentsService {
  constructor(
    @inject('BugCommentsRepository')
    private bugCommentsRepository: IBugCommentsRepository,
    @inject('BugsRepository')
    private bugsRepository: IBugsRepository,
  ) {}

  public async execute({ bug_id }: IRequest): Promise<BugComment[]> {
    const bug = await this.bugsRepository.findById(bug_id);

    if (!bug) {
      throw new AppError('Bug not found');
    }

    const comments = await this.bugCommentsRepository.findAllByBugId(bug_id);

    return comments;
  }
}

export default ListBugCommentsService;
