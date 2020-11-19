import { uuid } from 'uuidv4';

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';

import Project from '@modules/projects/infra/typeorm/entities/Project';

class FakeProjectsRepository implements IProjectsRepository {
  private projects: Project[] = [];

  public async findById(id: string): Promise<Project | undefined> {
    const findProject = this.projects.find(project => project.id === id);

    return findProject;
  }

  public async findByListenerKey(key: string): Promise<Project | undefined> {
    const findProject = this.projects.find(
      project => project.listener_key === key,
    );

    return findProject;
  }

  public async findByIdWithBugs(id: string): Promise<Project | undefined> {
    const findProject = this.projects.find(project => project.id === id);

    return findProject;
  }

  public async findByProjectAndOwnerId(
    projectId: string,
    ownerId: string,
  ): Promise<Project | undefined> {
    const findProject = this.projects.find(
      project => project.id === projectId && project.owner_id === ownerId,
    );

    return findProject;
  }

  public async create(projectData: ICreateProjectDTO): Promise<Project> {
    const project = new Project();

    Object.assign(project, { id: uuid(), listener_key: uuid() }, projectData);

    this.projects.push(project);

    return project;
  }

  public async save(project: Project): Promise<Project> {
    const findIndex = this.projects.findIndex(
      findProject => findProject.id === project.id,
    );

    this.projects[findIndex] = project;

    return project;
  }
}

export default FakeProjectsRepository;
