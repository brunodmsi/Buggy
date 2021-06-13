import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AddFileToBugService from '@modules/bugs/services/AddFileToBugService';
import DeleteBugFileService from '@modules/bugs/services/DeleteBugFileService';

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

  async delete(request: Request, response: Response): Promise<Response> {
    const { bug_file_id } = request.params;

    const deleteBugFile = container.resolve(DeleteBugFileService);

    await deleteBugFile.execute({ bug_file_id });

    return response.status(204).send();
  }
}

export default BugFileController;
