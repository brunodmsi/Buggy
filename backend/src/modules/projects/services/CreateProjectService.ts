import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IProjectsRepository from '../repositories/IProjectsRepository';

import Project from '../infra/typeorm/entities/Project';

interface IRequest {
  name: string;
  description: string;
  url: string;
  owner_id: string;
}

@injectable()
class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    description,
    url,
    owner_id,
  }: IRequest): Promise<Project> {
    const user = await this.usersRepository.findById(owner_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const project = await this.projectsRepository.create({
      name,
      description,
      url,
      owner_id: user.id,
    });

    return project;
  }
}

export default CreateProjectService;
