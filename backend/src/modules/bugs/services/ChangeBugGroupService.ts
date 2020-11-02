import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IBugsRepository from '../repositories/IBugsRepository';

import Bug from '../infra/typeorm/entities/Bug';

interface IRequest {
  bug_id: string;
  new_group: number;
}

@injectable()
class ChangeBugGroupService {
  constructor(
    @inject('BugsRepository')
    private bugsRepository: IBugsRepository,
  ) {}

  public async execute({ bug_id, new_group }: IRequest): Promise<Bug> {
    const bug = await this.bugsRepository.findById(bug_id);

    if (!bug) {
      throw new AppError('Bug not found');
    }

    if (new_group < 0 || new_group > 3)
      throw new AppError('Group must be between 0 and 3');

    bug.group = new_group;

    await this.bugsRepository.save(bug);

    return bug;
  }
}

export default ChangeBugGroupService;
