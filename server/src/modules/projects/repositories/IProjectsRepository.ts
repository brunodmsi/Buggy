import Project from '../infra/typeorm/entities/Project';

import ICreateProjectDTO from '../dtos/ICreateProjectDTO';

export default interface IProjectsRepository {
  findById(id: string): Promise<Project | undefined>;
  findByListenerKey(key: string): Promise<Project | undefined>;
  findByIdWithBugs(id: string): Promise<Project | undefined>;
  findByProjectAndOwnerId(
    projectId: string,
    bugId: string,
  ): Promise<Project | undefined>;

  create(data: ICreateProjectDTO): Promise<Project>;
  save(project: Project): Promise<Project>;
}
