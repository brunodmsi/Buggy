import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Bug from '@modules/bugs/infra/typeorm/entities/Bug';
import IBugsRepository from '../repositories/IBugsRepository';

interface IRequest {
  bug_id: string;
}

@injectable()
class ListBugService {
  constructor(
    @inject('BugsRepository')
    private bugsRepository: IBugsRepository,
  ) {}

  public async execute({ bug_id }: IRequest): Promise<Bug> {
    const bug = await this.bugsRepository.findById(bug_id);

    if (!bug) {
      throw new AppError('Bug not found');
    }

    return bug;
  }
}

export default ListBugService;
