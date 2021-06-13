import { uuid } from 'uuidv4';

import IUserProjectsRepository from '@modules/projects/repositories/IUserProjectsRepository';
import IUserProjectDTO from '@modules/projects/dtos/IUserProjectDTO';

import UserProject from '@modules/projects/infra/typeorm/entities/UserProject';

class FakeUserProjectsRepository implements IUserProjectsRepository {
  private userProjects: UserProject[] = [];

  public async findProjectUsersById(
    project_id: string,
  ): Promise<UserProject[]> {
    const findProjectUsers = this.userProjects.filter(
      userProject => userProject.project_id === project_id,
    );

    return findProjectUsers;
  }

  public async findUserProjectsById(user_id: string): Promise<UserProject[]> {
    const findUserProjects = this.userProjects.filter(
      userProject => userProject.user_id === user_id,
    );

    return findUserProjects;
  }

  public async checkIfUserIsAlreadyAddedToProject({
    project_id,
    user_id,
  }: IUserProjectDTO): Promise<boolean> {
    const findProject = this.userProjects.filter(
      userProject => userProject.project_id === project_id,
    );

    const findUserInProject = findProject.find(
      userProject => userProject.user_id === user_id,
    );

    return !!findUserInProject;
  }

  public async create(userProjectData: IUserProjectDTO): Promise<UserProject> {
    const userProject = new UserProject();

    Object.assign(userProject, { id: uuid() }, userProjectData);

    this.userProjects.push(userProject);

    return userProject;
  }

  public async save(userProject: UserProject): Promise<UserProject> {
    const findIndex = this.userProjects.findIndex(
      findUserProjects => findUserProjects.id === userProject.id,
    );

    this.userProjects[findIndex] = userProject;

    return userProject;
  }
}

export default FakeUserProjectsRepository;
