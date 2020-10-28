import { uuid } from 'uuidv4';

import IBugChecklistItemsRepository from '@modules/bugs/repositories/IBugChecklistItemsRepository';
import IBugChecklistItemDTO from '@modules/bugs/dtos/IBugChecklistItemDTO';

import BugChecklistItem from '@modules/bugs/infra/typeorm/entities/BugChecklistItem';

class FakeBugChecklistsRepository implements IBugChecklistItemsRepository {
  private bugChecklistItems: BugChecklistItem[] = [];

  public async findById(id: string): Promise<BugChecklistItem | undefined> {
    const findBugChecklistItem = this.bugChecklistItems.find(
      bugChecklistItem => bugChecklistItem.id === id,
    );

    return findBugChecklistItem;
  }

  public async findAllByChecklistId(id: string): Promise<BugChecklistItem[]> {
    const findBugChecklistItems = this.bugChecklistItems.filter(
      bugChecklistItem => bugChecklistItem.checklist_id === id,
    );

    return findBugChecklistItems;
  }

  public async deleteById(id: string): Promise<void> {
    const findIndex = this.bugChecklistItems.findIndex(
      bugChecklist => bugChecklist.id === id,
    );

    this.bugChecklistItems.splice(findIndex, 1);
  }

  public async create(
    bugChecklistData: IBugChecklistItemDTO,
  ): Promise<BugChecklistItem> {
    const bugChecklist = new BugChecklistItem();

    Object.assign(bugChecklist, { id: uuid() }, bugChecklistData);

    this.bugChecklistItems.push(bugChecklist);

    return bugChecklist;
  }

  public async save(
    bugChecklistItem: BugChecklistItem,
  ): Promise<BugChecklistItem> {
    const findIndex = this.bugChecklistItems.findIndex(
      findbugChecklists => findbugChecklists.id === bugChecklistItem.id,
    );

    this.bugChecklistItems[findIndex] = bugChecklistItem;

    return bugChecklistItem;
  }
}

export default FakeBugChecklistsRepository;
