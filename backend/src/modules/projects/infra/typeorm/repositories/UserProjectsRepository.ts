import { Repository, getRepository } from 'typeorm';

import IUserProjectsRepository from '@modules/projects/repositories/IUserProjectsRepository';
import IUserProjectDTO from '@modules/projects/dtos/IUserProjectDTO';

import UserProject from '../entities/UserProject';

class UserProjectsRepository implements IUserProjectsRepository {
  private ormRepository: Repository<UserProject>;

  constructor() {
    this.ormRepository = getRepository(UserProject);
  }

  public async findProjectUsersById(
    project_id: string,
  ): Promise<UserProject[]> {
    const users = await this.ormRepository.find({
      where: { project_id },
      relations: ['user'],
    });

    return users;
  }

  public async findUserProjectsById(user_id: string): Promise<UserProject[]> {
    const projects = await this.ormRepository.find({
      where: { user_id },
      relations: ['project', 'project.bugs', 'project.bugs.developers', 'project.bugs.developers.user'],
    });

    return projects;
  }

  public async checkIfUserIsAlreadyAddedToProject({
    project_id,
    user_id,
  }: IUserProjectDTO): Promise<boolean> {
    const userInProject = await this.ormRepository.findOne({
      where: { project_id, user_id },
    });

    return !!userInProject;
  }

  public async create(addUserData: IUserProjectDTO): Promise<UserProject> {
    const project = this.ormRepository.create(addUserData);

    await this.ormRepository.save(project);

    return project;
  }

  public async save(userProject: UserProject): Promise<UserProject> {
    return this.ormRepository.save(userProject);
  }
}

export default UserProjectsRepository;
