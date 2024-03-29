import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateDateLimitService from '@modules/bugs/services/UpdateDateLimitService';

class BugDateController {
  async update(request: Request, response: Response): Promise<Response> {
    const { bug_id } = request.params;
    const { date_limit } = request.body;

    const updateDateLimit = container.resolve(UpdateDateLimitService);

    const bug = await updateDateLimit.execute({ bug_id, date: date_limit });

    return response.json(bug);
  }
}

export default BugDateController;
