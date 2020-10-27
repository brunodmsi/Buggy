import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import FakeBugsRepository from '../repositories/fakes/FakeBugsRepository';
import CreateBugService from './CreateBugService';
import UpdateDateLimitService from './UpdateDateLimitService';

let fakeProjectsRepository: FakeProjectsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createProject: CreateProjectService;
let fakeBugsRepository: FakeBugsRepository;
let createBug: CreateBugService;
let updateDateLimit: UpdateDateLimitService;

describe('ListDeveloperBugs', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeBugsRepository = new FakeBugsRepository();

    createProject = new CreateProjectService(
      fakeProjectsRepository,
      fakeUsersRepository,
    );

    createBug = new CreateBugService(
      fakeBugsRepository,
      fakeProjectsRepository,
    );

    updateDateLimit = new UpdateDateLimitService(fakeBugsRepository);
  });

  it('should be able to update bug date', async () => {
    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    const project = await createProject.execute({
      name: 'Scient',
      description: 'A new way of opening a bank account',
      url: 'https://scient.demasi.dev',
      owner_id: owner.id,
    });

    const bug = await createBug.execute({
      title: 'Erro na responsividade',
      description: 'Div está dando overflow na rota X',
      type: 'WEB',
      project_id: project.id,
      group: 0,
      status: 0,
    });

    const date = new Date(2020, 6, 8, 11, 59);

    await updateDateLimit.execute({
      bug_id: bug.id,
      date,
    });

    expect(bug.date_limit).toEqual(date);
  });

  it('should not be able to update date of non-existing bug', async () => {
    const date = new Date(2020, 6, 8, 11, 59);

    await expect(
      updateDateLimit.execute({
        bug_id: 'non-existing-bug',
        date,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
