import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ChangeBugDescriptionService from '@modules/bugs/services/ChangeBugDescriptionService';

class BugDescriptionController {
  async update(request: Request, response: Response): Promise<Response> {
    const { bug_id } = request.params;
    const { description } = request.body;

    const changeBugDescription = container.resolve(ChangeBugDescriptionService);

    const bug = await changeBugDescription.execute({
      bug_id,
      description,
    });

    return response.json(bug);
  }
}

export default BugDescriptionController;
