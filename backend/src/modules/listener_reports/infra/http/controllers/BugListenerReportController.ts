import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBugWithListenerReportService from '@modules/listener_reports/services/CreateBugWithListenerReportService';

class BugListenerReportController {
  async create(request: Request, response: Response): Promise<Response> {
    const bugListenerReportData = request.body;

    const createBugWithListenerReport = container.resolve(
      CreateBugWithListenerReportService,
    );

    const bugWithListenerReport = await createBugWithListenerReport.execute(
      bugListenerReportData,
    );

    return response.json(bugWithListenerReport);
  }
}

export default BugListenerReportController;
