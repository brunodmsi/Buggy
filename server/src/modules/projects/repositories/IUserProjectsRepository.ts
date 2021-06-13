import UserProject from '../infra/typeorm/entities/UserProject';

import IUserProjectDTO from '../dtos/IUserProjectDTO';

export default interface IProjectsRepository {
  findUserProjectsById(user_id: string): Promise<UserProject[]>;
  findProjectUsersById(project_id: string): Promise<UserProject[]>;

  checkIfUserIsAlreadyAddedToProject(data: IUserProjectDTO): Promise<boolean>;

  create(data: IUserProjectDTO): Promise<UserProject>;
  save(userProject: UserProject): Promise<UserProject>;
}
