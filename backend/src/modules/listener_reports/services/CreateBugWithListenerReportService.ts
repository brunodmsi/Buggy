import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IBugsRepository from '@modules/bugs/repositories/IBugsRepository';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import IListenerReportsRepository from '../repositories/IListenerReportsRepository';

import ListenerReport from '../infra/typeorm/entities/ListenerReport';

interface IListenerReportData {
  stack_where: string;
  stack_line: string;
  request_body: string | undefined;
  request_method: string;
  request_url_protocol: string;
  request_url: string;
  request_url_path: string;
  request_headers: string;
  request_query: string;
  request_params: string;
  error_query: string;
}

interface IRequest {
  name: string;
  message: string;
  type: string;
  listener_key: string;
  data: IListenerReportData;
}

@injectable()
class CreateListenerReportService {
  constructor(
    @inject('ListenerReportsRepository')
    private listenerReportsRepository: IListenerReportsRepository,
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
    @inject('BugsRepository')
    private bugsRepository: IBugsRepository,
  ) {}

  public async execute({
    name,
    message,
    type,
    listener_key,
    data,
  }: IRequest): Promise<ListenerReport> {
    const project = await this.projectsRepository.findByListenerKey(
      listener_key,
    );

    if (!project) {
      throw new AppError('Project not found with Listener key');
    }

    const listenerData = {
      name,
      message,
      ...data,
    };

    const listenerReport = await this.listenerReportsRepository.create(
      listenerData,
    );

    const bugTitle = `${name}: ${message}`;

    const bug = await this.bugsRepository.create({
      title: bugTitle,
      description: 'Sem descrição...',
      type,
      group: 0,
      status: 0,
      project_id: project.id,
      listener_report_id: listenerReport.id,
    });

    listenerReport.bug_id = bug.id;
    await this.listenerReportsRepository.save(listenerReport);

    return listenerReport;
  }
}

export default CreateListenerReportService;
