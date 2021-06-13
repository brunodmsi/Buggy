import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ChangeBugGroupService from '@modules/bugs/services/ChangeBugGroupService';

class BugGroupController {
  async update(request: Request, response: Response): Promise<Response> {
    const { bug_id } = request.params;
    const { new_group } = request.body;

    const changeBugGroup = container.resolve(ChangeBugGroupService);

    const bug = await changeBugGroup.execute({
      bug_id,
      new_group,
    });

    return response.json(bug);
  }
}

export default BugGroupController;
