import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddChecklistToBugService from '@modules/bugs/services/AddChecklistToBugService';

class BugChecklistController {
  async create(request: Request, response: Response): Promise<Response> {
    const { bug_id } = request.params;
    const { title } = request.body;

    const addChecklistToBug = container.resolve(AddChecklistToBugService);

    const bugChecklist = await addChecklistToBug.execute({
      bug_id,
      title,
    });

    return response.json(bugChecklist);
  }
}

export default BugChecklistController;
