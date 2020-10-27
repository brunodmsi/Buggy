import { uuid } from 'uuidv4';

import IBugChecklistsRepository from '@modules/bugs/repositories/IBugChecklistsRepository';
import IBugChecklistDTO from '@modules/bugs/dtos/IBugChecklistDTO';

import BugChecklist from '@modules/bugs/infra/typeorm/entities/BugChecklist';

class FakeBugChecklistsRepository implements IBugChecklistsRepository {
  private bugChecklists: BugChecklist[] = [];

  public async findById(id: string): Promise<BugChecklist | undefined> {
    const findBugChecklist = this.bugChecklists.find(
      bugChecklist => bugChecklist.id === id,
    );

    return findBugChecklist;
  }

  public async findAllByBugId(id: string): Promise<BugChecklist[]> {
    const findBugChecklists = this.bugChecklists.filter(
      bugChecklist => bugChecklist.bug_id === id,
    );

    return findBugChecklists;
  }

  public async deleteById(id: string): Promise<void> {
    const findIndex = this.bugChecklists.findIndex(
      bugChecklist => bugChecklist.id === id,
    );

    this.bugChecklists.splice(findIndex, 1);
  }

  public async create(
    bugChecklistData: IBugChecklistDTO,
  ): Promise<BugChecklist> {
    const bugChecklist = new BugChecklist();

    Object.assign(bugChecklist, { id: uuid() }, bugChecklistData);

    this.bugChecklists.push(bugChecklist);

    return bugChecklist;
  }

  public async save(bugChecklist: BugChecklist): Promise<BugChecklist> {
    const findIndex = this.bugChecklists.findIndex(
      findbugChecklists => findbugChecklists.id === bugChecklist.id,
    );

    this.bugChecklists[findIndex] = bugChecklist;

    return bugChecklist;
  }
}

export default FakeBugChecklistsRepository;
