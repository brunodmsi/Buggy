import { Repository, getRepository } from 'typeorm';

import IBugChecklistDTO from '@modules/bugs/dtos/IBugChecklistDTO';
import BugChecklist from '@modules/bugs/infra/typeorm/entities/BugChecklist';
import IBugChecklistsRepository from '@modules/bugs/repositories/IBugChecklistsRepository';

class BugChecklistsRepository implements IBugChecklistsRepository {
  private ormRepository: Repository<BugChecklist>;

  constructor() {
    this.ormRepository = getRepository(BugChecklist);
  }

  public async findById(id: string): Promise<BugChecklist | undefined> {
    const bugChecklist = await this.ormRepository.findOne(id);

    return bugChecklist;
  }

  public async findAllByBugId(bug_id: string): Promise<BugChecklist[]> {
    const bugChecklists = await this.ormRepository.find({
      where: { bug_id },
    });

    return bugChecklists;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async create(
    bugChecklistData: IBugChecklistDTO,
  ): Promise<BugChecklist> {
    const bugChecklist = this.ormRepository.create(bugChecklistData);

    await this.ormRepository.save(bugChecklist);

    return bugChecklist;
  }

  public async save(bugChecklist: BugChecklist): Promise<BugChecklist> {
    return this.ormRepository.save(bugChecklist);
  }
}

export default BugChecklistsRepository;
