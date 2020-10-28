import BugChecklistItem from '../infra/typeorm/entities/BugChecklistItem';

import IBugChecklistItemDTO from '../dtos/IBugChecklistItemDTO';

export default interface IBugChecklistItemsRepository {
  findById(id: string): Promise<BugChecklistItem | undefined>;
  findAllByChecklistId(id: string): Promise<BugChecklistItem[]>;
  deleteById(id: string): Promise<void>;

  create(data: IBugChecklistItemDTO): Promise<BugChecklistItem>;
  save(bugChecklistItem: BugChecklistItem): Promise<BugChecklistItem>;
}
