import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import BugDeveloper from '@modules/bugs/infra/typeorm/entities/BugDeveloper';
import IBugsRepository from '../repositories/IBugsRepository';
import IBugDevelopersRepository from '../repositories/IBugDevelopersRepository';

interface IRequest {
  bug_id: string;
}

@injectable()
class ListBugDevelopersService {
  constructor(
    @inject('BugDevelopersRepository')
    private bugDevelopersRepository: IBugDevelopersRepository,
    @inject('BugsRepository')
    private bugsRepository: IBugsRepository,
  ) {}

  public async execute({ bug_id }: IRequest): Promise<BugDeveloper[]> {
    const bug = await this.bugsRepository.findById(bug_id);

    if (!bug) {
      throw new AppError('Bug not found');
    }

    const developers = await this.bugDevelopersRepository.listBugDevelopersById(
      bug_id,
    );

    return developers;
  }
}

export default ListBugDevelopersService;
