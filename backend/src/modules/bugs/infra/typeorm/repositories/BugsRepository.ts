import { Repository, getRepository } from 'typeorm';

import ICreateBugDTO from '@modules/bugs/dtos/ICreateBugDTO';
import Bug from '@modules/bugs/infra/typeorm/entities/Bug';
import IBugsRepository from '@modules/bugs/repositories/IBugsRepository';

class FakeBugsRepository implements IBugsRepository {
  private ormRepository: Repository<Bug>;

  constructor() {
    this.ormRepository = getRepository(Bug);
  }

  public async findById(id: string): Promise<Bug | undefined> {
    const bug = await this.ormRepository.findOne(id, {
      relations: ['project', 'developers', 'files', 'checklists', 'comments'],
    });

    return bug;
  }

  public async findAllByProjectId(project_id: string): Promise<Bug[]> {
    const bugs = await this.ormRepository.find({
      where: { project_id },
    });

    return bugs;
  }

  public async create(bugData: ICreateBugDTO): Promise<Bug> {
    const bug = this.ormRepository.create(bugData);

    await this.ormRepository.save(bug);

    return bug;
  }

  public async save(bug: Bug): Promise<Bug> {
    return this.ormRepository.save(bug);
  }
}

export default FakeBugsRepository;
