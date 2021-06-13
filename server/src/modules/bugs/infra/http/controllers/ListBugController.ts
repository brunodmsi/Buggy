import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListBugService from '@modules/bugs/services/ListBugService';

class ListBugController {
  async index(request: Request, response: Response): Promise<Response> {
    const { bug_id } = request.params;

    const listBug = container.resolve(ListBugService);

    const bug = await listBug.execute({ bug_id });

    return response.json(classToClass(bug));
  }
}

export default ListBugController;
