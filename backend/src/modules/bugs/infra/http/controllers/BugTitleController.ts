import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ChangeBugTitleService from '@modules/bugs/services/ChangeBugTitleService';

class BugGroupController {
  async update(request: Request, response: Response): Promise<Response> {
    const { bug_id } = request.params;
    const { title } = request.body;

    const changeBugTitle = container.resolve(ChangeBugTitleService);

    const bug = await changeBugTitle.execute({
      bug_id,
      title,
    });

    return response.json(bug);
  }
}

export default BugGroupController;
