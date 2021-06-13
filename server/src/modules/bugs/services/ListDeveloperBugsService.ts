import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import BugDeveloper from '@modules/bugs/infra/typeorm/entities/BugDeveloper';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IBugDevelopersRepository from '../repositories/IBugDevelopersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListDeveloperBugsService {
  constructor(
    @inject('BugDevelopersRepository')
    private bugDevelopersRepository: IBugDevelopersRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<BugDeveloper[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const bugs = await this.bugDevelopersRepository.listDeveloperBugsById(
      user_id,
    );

    return bugs;
  }
}

export default ListDeveloperBugsService;
