import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ArchiveBugService from '@modules/bugs/services/ArchiveBugService';

class BugArchiveController {
  async update(request: Request, response: Response): Promise<Response> {
    const { bug_id } = request.params;

    const archiveBug = container.resolve(ArchiveBugService);

    const bugs = await archiveBug.execute({
      bug_id,
    });

    return response.json(bugs);
  }
}

export default BugArchiveController;
