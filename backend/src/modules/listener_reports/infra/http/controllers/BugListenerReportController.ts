import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBugWithListenerReportService from '@modules/listener_reports/services/CreateBugWithListenerReportService';

class BugListenerReportController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, message, type, listener_key, ...data } = request.body;

    const createBugWithListenerReport = container.resolve(
      CreateBugWithListenerReportService,
    );

    const bugWithListenerReport = await createBugWithListenerReport.execute({
      name,
      message,
      type,
      listener_key,
      data,
    });

    return response.json(bugWithListenerReport);
  }
}

export default BugListenerReportController;
