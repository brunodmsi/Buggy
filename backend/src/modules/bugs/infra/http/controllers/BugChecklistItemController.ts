import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddItemToBugChecklistService from '@modules/bugs/services/AddItemToBugChecklistService';

class BugChecklistItemController {
  async update(request: Request, response: Response): Promise<Response> {
    const { checklist_id } = request.params;
    const { text } = request.body;

    const addItemToBugChecklist = container.resolve(
      AddItemToBugChecklistService,
    );

    const bugChecklist = await addItemToBugChecklist.execute({
      checklist_id,
      text,
    });

    return response.json(bugChecklist);
  }
}

export default BugChecklistItemController;
