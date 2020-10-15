import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserProjectsRepository from '../repositories/IUserProjectsRepository';

import UserProject from '../infra/typeorm/entities/UserProject';

interface IRequest {
  user_id: string;
}

@injectable()
class ListUsersInProjectService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UserProjectsRepository')
    private userProjectsRepository: IUserProjectsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<UserProject[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const listProjects = await this.userProjectsRepository.findUserProjectsById(
      user.id,
    );

    return listProjects;
  }
}

export default ListUsersInProjectService;
