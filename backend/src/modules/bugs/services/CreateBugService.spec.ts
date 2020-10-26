import AppError from '@shared/errors/AppError';

import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import FakeBugsRepository from '../repositories/fakes/FakeBugsRepository';
import CreateBugService from './CreateBugService';

let fakeBugsRepository: FakeBugsRepository;
let fakeProjectsRepository: FakeProjectsRepository;
let createBug: CreateBugService;

describe('CreateBug', () => {
  beforeEach(() => {
    fakeBugsRepository = new FakeBugsRepository();
    fakeProjectsRepository = new FakeProjectsRepository();

    createBug = new CreateBugService(
      fakeBugsRepository,
      fakeProjectsRepository,
    );
  });

  it('should be able to create a new project', async () => {
    const project = await fakeProjectsRepository.create({
      name: 'Scient',
      description: 'A new way of opening a bank account',
      url: 'https://scient.demasi.dev',
      owner_id: 'non-existing-user-id',
    });

    const bug = await createBug.execute({
      title: 'Erro na responsividade',
      description: 'Div está dando overflow na rota X',
      type: 'WEB',
      project_id: project.id,
      group: 0,
      status: 0,
      date_limit: new Date(2020, 8, 20, 11, 0),
    });

    expect(bug).toHaveProperty('id');
  });

  it('should not be able to create a bug with non-existing project', async () => {
    await expect(
      createBug.execute({
        title: 'Erro na responsividade',
        description: 'Div está dando overflow na rota X',
        type: 'WEB',
        project_id: 'non-existing-project-id',
        group: 0,
        status: 0,
        date_limit: new Date(2020, 8, 20, 11, 0),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
