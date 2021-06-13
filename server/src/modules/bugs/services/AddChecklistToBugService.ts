import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IBugsRepository from '../repositories/IBugsRepository';
import IBugChecklistsRepository from '../repositories/IBugChecklistsRepository';

import BugChecklist from '../infra/typeorm/entities/BugChecklist';

interface IRequest {
  bug_id: string;
  title: string;
}

@injectable()
class AddChecklistToBugService {
  constructor(
    @inject('BugsRepository')
    private bugsRepository: IBugsRepository,
    @inject('BugChecklistsRepository')
    private bugChecklistsRepository: IBugChecklistsRepository,
  ) {}

  public async execute({ bug_id, title }: IRequest): Promise<BugChecklist> {
    const bug = await this.bugsRepository.findById(bug_id);

    if (!bug) {
      throw new AppError('Bug not found');
    }

    const bugChecklist = await this.bugChecklistsRepository.create({
      bug_id: bug.id,
      title,
    });

    return bugChecklist;
  }
}

export default AddChecklistToBugService;
