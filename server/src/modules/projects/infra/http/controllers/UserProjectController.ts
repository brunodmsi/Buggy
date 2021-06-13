import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddUserToProjectService from '@modules/projects/services/AddUserToProjectService';

class UserProjectController {
  async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { email } = request.body;
    const { project_id } = request.params;

    const addUserToProject = container.resolve(AddUserToProjectService);

    const userProject = await addUserToProject.execute({
      auth_user_id: user_id,
      user_email: email,
      project_id,
    });

    return response.json(userProject);
  }
}

export default UserProjectController;
