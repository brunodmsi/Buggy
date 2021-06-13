import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IBugChecklistItemsRepository from '../repositories/IBugChecklistItemsRepository';

import BugChecklistItem from '../infra/typeorm/entities/BugChecklistItem';

interface IRequest {
  checklist_item_id: string;
  status: boolean;
}

@injectable()
class ChangeChecklistItemStatusService {
  constructor(
    @inject('BugChecklistItemsRepository')
    private bugChecklistItemsRepository: IBugChecklistItemsRepository,
  ) {}

  public async execute({
    checklist_item_id,
    status,
  }: IRequest): Promise<BugChecklistItem> {
    const checklistItem = await this.bugChecklistItemsRepository.findById(
      checklist_item_id,
    );

    if (!checklistItem) {
      throw new AppError('Item not found');
    }

    checklistItem.done = status;

    await this.bugChecklistItemsRepository.save(checklistItem);

    return checklistItem;
  }
}

export default ChangeChecklistItemStatusService;
