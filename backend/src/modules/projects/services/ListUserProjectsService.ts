import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserProjectsRepository from '../repositories/IUserProjectsRepository';

import Project from '../infra/typeorm/entities/Project';

interface IRequest {
  user_id: string;
}

@injectable()
class ListUserProjectsService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UserProjectsRepository')
    private userProjectsRepository: IUserProjectsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Project[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const listProjects = await this.userProjectsRepository.findUserProjectsById(
      user.id,
    );

    const projects = listProjects.map(item => item.project);

    return projects;
  }
}

export default ListUserProjectsService;
