import { Repository, getRepository } from 'typeorm';

import IBugDeveloperDTO from '@modules/bugs/dtos/IBugDeveloperDTO';
import BugComment from '@modules/bugs/infra/typeorm/entities/BugComment';
import IBugCommentsRepository from '@modules/bugs/repositories/IBugCommentsRepository';

class BugCommentsRepository implements IBugCommentsRepository {
  private ormRepository: Repository<BugComment>;

  constructor() {
    this.ormRepository = getRepository(BugComment);
  }

  public async findById(id: string): Promise<BugComment | undefined> {
    const bugComment = await this.ormRepository.findOne(id);

    return bugComment;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async create(bugDeveloperData: IBugDeveloperDTO): Promise<BugComment> {
    const bugDeveloper = this.ormRepository.create(bugDeveloperData);

    await this.ormRepository.save(bugDeveloper);

    return bugDeveloper;
  }

  public async save(bugComment: BugComment): Promise<BugComment> {
    return this.ormRepository.save(bugComment);
  }
}

export default BugCommentsRepository;
