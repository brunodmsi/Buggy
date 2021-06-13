import { Repository, getRepository } from 'typeorm';

import IBugChecklistItemDTO from '@modules/bugs/dtos/IBugChecklistItemDTO';
import BugChecklistItem from '@modules/bugs/infra/typeorm/entities/BugChecklistItem';
import IBugChecklistItemsRepository from '@modules/bugs/repositories/IBugChecklistItemsRepository';

class BugChecklistItemsRepository implements IBugChecklistItemsRepository {
  private ormRepository: Repository<BugChecklistItem>;

  constructor() {
    this.ormRepository = getRepository(BugChecklistItem);
  }

  public async findById(id: string): Promise<BugChecklistItem | undefined> {
    const bugChecklistItem = await this.ormRepository.findOne(id);

    return bugChecklistItem;
  }

  public async findAllByChecklistId(
    checklist_id: string,
  ): Promise<BugChecklistItem[]> {
    const bugChecklistItems = await this.ormRepository.find({
      where: { checklist_id },
    });

    return bugChecklistItems;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async create(
    bugChecklistItemData: IBugChecklistItemDTO,
  ): Promise<BugChecklistItem> {
    const bugChecklistItem = this.ormRepository.create(bugChecklistItemData);

    await this.ormRepository.save(bugChecklistItem);

    return bugChecklistItem;
  }

  public async save(
    bugChecklistItem: BugChecklistItem,
  ): Promise<BugChecklistItem> {
    return this.ormRepository.save(bugChecklistItem);
  }
}

export default BugChecklistItemsRepository;
