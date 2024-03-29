import { Repository, getRepository } from 'typeorm';

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';

import Project from '@modules/projects/infra/typeorm/entities/Project';

class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async findById(id: string): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne(id);

    return project;
  }

  public async findByListenerKey(key: string): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne({
      where: { listener_key: key },
    });

    return project;
  }

  public async findByIdWithBugs(id: string): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne(id, {
      relations: ['bugs', 'bugs.developers', 'bugs.developers.user'],
    });

    return project;
  }

  public async findByProjectAndOwnerId(
    projectId: string,
    ownerId: string,
  ): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne({
      where: { id: projectId, owner_id: ownerId },
    });

    return project;
  }

  public async create(projectData: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create(projectData);

    await this.ormRepository.save(project);

    return project;
  }

  public async save(project: Project): Promise<Project> {
    return this.ormRepository.save(project);
  }
}

export default ProjectsRepository;
