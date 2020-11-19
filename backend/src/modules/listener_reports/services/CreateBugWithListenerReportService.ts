import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IBugsRepository from '@modules/bugs/repositories/IBugsRepository';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import IListenerReportsRepository from '../repositories/IListenerReportsRepository';

import ListenerReport from '../infra/typeorm/entities/ListenerReport';

interface IRequest {
  listener_key: string;
  type: string;
  name: string;
  message: string;
  stack_where: string;
  stack_line: string;
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
    stack_where,
    stack_line,
    listener_key,
    type,
  }: IRequest): Promise<ListenerReport> {
    const project = await this.projectsRepository.findByListenerKey(
      listener_key,
    );

    if (!project) {
      throw new AppError('Project not found with Listener key');
    }

    const listenerReport = await this.listenerReportsRepository.create({
      name,
      message,
      stack_line,
      stack_where,
    });

    const bugTitle = `${name}: ${message}`;
    const bugDescription = [
      `Qual tipo de erro? ${listenerReport.name}`,
      `Qual foi o erro? ${listenerReport.message}`,
      `Onde? ${listenerReport.stack_where}\n\n`,
      `Na linha ${listenerReport.stack_line}\n\n`,
    ].join('');

    await this.bugsRepository.create({
      title: bugTitle,
      description: bugDescription,
      type,
      group: 0,
      status: 0,
      project_id: project.id,
      listener_report_id: listenerReport.id,
    });

    return listenerReport;
  }
}

export default CreateListenerReportService;
