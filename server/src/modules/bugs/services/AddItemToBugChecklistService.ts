import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IBugChecklistsRepository from '../repositories/IBugChecklistsRepository';
import IBugChecklistItemsRepository from '../repositories/IBugChecklistItemsRepository';

import BugChecklistItem from '../infra/typeorm/entities/BugChecklistItem';

interface IRequest {
  checklist_id: string;
  text: string;
}

@injectable()
class AddItemToBugChecklistService {
  constructor(
    @inject('BugChecklistsRepository')
    private bugChecklistsRepository: IBugChecklistsRepository,
    @inject('BugChecklistItemsRepository')
    private bugChecklistItemsRepository: IBugChecklistItemsRepository,
  ) {}

  public async execute({
    checklist_id,
    text,
  }: IRequest): Promise<BugChecklistItem> {
    const bugChecklist = await this.bugChecklistsRepository.findById(
      checklist_id,
    );

    if (!bugChecklist) {
      throw new AppError('BugChecklist not found');
    }

    const bugChecklistItem = await this.bugChecklistItemsRepository.create({
      text,
      done: false,
      checklist_id: bugChecklist.id,
    });

    return bugChecklistItem;
  }
}

export default AddItemToBugChecklistService;
