import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IBugsRepository from '../repositories/IBugsRepository';

import Bug from '../infra/typeorm/entities/Bug';

interface IRequest {
  bug_id: string;
  description: string;
}

@injectable()
class ChangeBugDescriptionService {
  constructor(
    @inject('BugsRepository')
    private bugsRepository: IBugsRepository,
  ) {}

  public async execute({ bug_id, description }: IRequest): Promise<Bug> {
    const bug = await this.bugsRepository.findById(bug_id);

    if (!bug) {
      throw new AppError('Bug not found');
    }

    bug.description = description;

    await this.bugsRepository.save(bug);

    return bug;
  }
}

export default ChangeBugDescriptionService;
