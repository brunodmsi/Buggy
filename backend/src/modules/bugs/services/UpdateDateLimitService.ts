import { injectable, inject } from 'tsyringe';
import {} from 'date-fns';

import AppError from '@shared/errors/AppError';
import Bug from '@modules/bugs/infra/typeorm/entities/Bug';
import IBugsRepository from '../repositories/IBugsRepository';

interface IRequest {
  bug_id: string;
  date: Date;
}

@injectable()
class UpdateDateLimitService {
  constructor(
    @inject('BugsRepository')
    private bugsRepository: IBugsRepository,
  ) {}

  public async execute({ bug_id, date }: IRequest): Promise<Bug> {
    const bug = await this.bugsRepository.findById(bug_id);

    if (!bug) {
      throw new AppError('Bug not found');
    }

    bug.date_limit = date;

    await this.bugsRepository.save(bug);

    return bug;
  }
}

export default UpdateDateLimitService;
