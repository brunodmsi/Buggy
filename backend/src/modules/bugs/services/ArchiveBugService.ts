import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IBugsRepository from '../repositories/IBugsRepository';

import Bug from '../infra/typeorm/entities/Bug';

interface IRequest {
  bug_id: string;
}

@injectable()
class ChangeDeliveredBugService {
  constructor(
    @inject('BugsRepository')
    private bugsRepository: IBugsRepository,
  ) {}

  public async execute({ bug_id }: IRequest): Promise<Bug> {
    const bug = await this.bugsRepository.findById(bug_id);

    if (!bug) {
      throw new AppError('Bug not found');
    }

    bug.archived = true;

    await this.bugsRepository.save(bug);

    return bug;
  }
}

export default ChangeDeliveredBugService;
