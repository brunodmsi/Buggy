import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IBugsRepository from '../repositories/IBugsRepository';
import IBugDevelopersRepository from '../repositories/IBugDevelopersRepository';

import BugDeveloper from '../infra/typeorm/entities/BugDeveloper';

interface IRequest {
  user_id: string;
  bug_id: string;
}

@injectable()
class AddDeveloperToBugService {
  constructor(
    @inject('BugsRepository')
    private bugsRepository: IBugsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('BugDevelopersRepository')
    private bugDevelopersRepository: IBugDevelopersRepository,
  ) {}

  public async execute({ bug_id, user_id }: IRequest): Promise<BugDeveloper> {
    const bug = await this.bugsRepository.findById(bug_id);

    if (!bug) {
      throw new AppError('Bug not found');
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const checkAddedDeveloper = await this.bugDevelopersRepository.checkIfDeveloperIsAlreadyAddedToBug(
      {
        bug_id,
        user_id,
      },
    );

    if (checkAddedDeveloper) {
      throw new AppError('User is already added');
    }

    const bugDeveloper = await this.bugDevelopersRepository.create({
      user_id: user.id,
      bug_id: bug.id,
    });

    return bugDeveloper;
  }
}

export default AddDeveloperToBugService;
