import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AddFileToBugService from '@modules/bugs/services/AddFileToBugService';

class BugFileController {
  async create(request: Request, response: Response): Promise<Response> {
    const { bug_id } = request.params;

    const addFileToBug = container.resolve(AddFileToBugService);

    const bugFile = await addFileToBug.execute({
      bug_id,
      bugFilename: request.file.filename,
    });

    return response.json(classToClass(bugFile));
  }
}

export default BugFileController;
