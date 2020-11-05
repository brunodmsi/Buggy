import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ChangeDeliveredBugService from '@modules/bugs/services/ChangeDeliveredBugService';

class BugDescriptionController {
  async update(request: Request, response: Response): Promise<Response> {
    const { bug_id } = request.params;
    const { delivered } = request.body;

    const changeDeliveredBug = container.resolve(ChangeDeliveredBugService);

    const bug = await changeDeliveredBug.execute({
      bug_id,
      delivered,
    });

    return response.json(bug);
  }
}

export default BugDescriptionController;
