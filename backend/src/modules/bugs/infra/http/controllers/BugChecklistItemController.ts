import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddItemToBugChecklistService from '@modules/bugs/services/AddItemToBugChecklistService';
import ChangeChecklistItemStatusService from '@modules/bugs/services/ChangeChecklistItemStatusService';

class BugChecklistItemController {
  async create(request: Request, response: Response): Promise<Response> {
    const { checklist_id } = request.params;
    const { text } = request.body;

    const addItemToBugChecklist = container.resolve(
      AddItemToBugChecklistService,
    );

    const checklistItem = await addItemToBugChecklist.execute({
      checklist_id,
      text,
    });

    return response.json(checklistItem);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { checklist_item_id } = request.params;
    const { status } = request.body;

    const changeChecklistItemStatus = container.resolve(
      ChangeChecklistItemStatusService,
    );

    const checklistItem = await changeChecklistItemStatus.execute({
      checklist_item_id,
      status,
    });

    return response.json(checklistItem);
  }
}

export default BugChecklistItemController;
