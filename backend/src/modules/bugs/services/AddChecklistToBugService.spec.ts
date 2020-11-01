import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import FakeUserProjectsRepository from '@modules/projects/repositories/fakes/FakeUserProjectsRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeBugsRepository from '../repositories/fakes/FakeBugsRepository';
import FakeBugChecklistsRepository from '../repositories/fakes/FakeBugChecklistsRepository';
import AddChecklistToBugService from './AddChecklistToBugService';
import CreateBugService from './CreateBugService';

let fakeBugsRepository: FakeBugsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeProjectsRepository: FakeProjectsRepository;
let fakeBugChecklistsRepository: FakeBugChecklistsRepository;
let addChecklistToBug: AddChecklistToBugService;
let fakeUserProjectsRepository: FakeUserProjectsRepository;
let fakeStorageProvider: FakeStorageProvider;
let createBug: CreateBugService;
let createProject: CreateProjectService;

describe('AddCommentToBug', () => {
  beforeEach(() => {
    fakeBugsRepository = new FakeBugsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeBugChecklistsRepository = new FakeBugChecklistsRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeUserProjectsRepository = new FakeUserProjectsRepository();

    createProject = new CreateProjectService(
      fakeProjectsRepository,
      fakeUsersRepository,
      fakeUserProjectsRepository,
      fakeStorageProvider,
    );

    createBug = new CreateBugService(
      fakeBugsRepository,
      fakeProjectsRepository,
    );

    addChecklistToBug = new AddChecklistToBugService(
      fakeBugsRepository,
      fakeBugChecklistsRepository,
    );
  });

  it('should be able to add a checklist to bug', async () => {
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
      date_limit: new Date(2020, 8, 20, 11, 0),
    });

    const bugChecklist = await addChecklistToBug.execute({
      bug_id: bug.id,
      title: 'Ajustes CSS',
    });

    expect(bugChecklist).toHaveProperty('id');
  });

  it('should not be able to add a checklist to a non-existing bug', async () => {
    await expect(
      addChecklistToBug.execute({
        bug_id: 'non-existing-bug',
        title: 'Ajustes CSS',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
