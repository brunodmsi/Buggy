import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import FakeUserProjectsRepository from '@modules/projects/repositories/fakes/FakeUserProjectsRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeBugsRepository from '../repositories/fakes/FakeBugsRepository';
import FakeBugChecklistsRepository from '../repositories/fakes/FakeBugChecklistsRepository';
import FakeBugChecklistItemsRepository from '../repositories/fakes/FakeBugChecklistItemsRepository';
import CreateBugService from './CreateBugService';
import AddItemToBugChecklistService from './AddItemToBugChecklistService';

let fakeBugsRepository: FakeBugsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeProjectsRepository: FakeProjectsRepository;
let fakeBugChecklistsRepository: FakeBugChecklistsRepository;
let fakeBugChecklistItemsRepository: FakeBugChecklistItemsRepository;
let fakeUserProjectsRepository: FakeUserProjectsRepository;
let fakeStorageProvider: FakeStorageProvider;
let addItemToBugChecklist: AddItemToBugChecklistService;
let createBug: CreateBugService;
let createProject: CreateProjectService;

describe('AddItemToBugChecklist', () => {
  beforeEach(() => {
    fakeBugsRepository = new FakeBugsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeBugChecklistsRepository = new FakeBugChecklistsRepository();
    fakeUserProjectsRepository = new FakeUserProjectsRepository();
    fakeBugChecklistItemsRepository = new FakeBugChecklistItemsRepository();
    fakeStorageProvider = new FakeStorageProvider();

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

    addItemToBugChecklist = new AddItemToBugChecklistService(
      fakeBugChecklistsRepository,
      fakeBugChecklistItemsRepository,
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

    const bugChecklist = await fakeBugChecklistsRepository.create({
      bug_id: bug.id,
      title: 'Ajustes CSS',
    });

    await expect(
      addItemToBugChecklist.execute({
        checklist_id: bugChecklist.id,
        text: 'Responsividade na dashboard',
      }),
    ).toHaveProperty('id');
  });

  it('should not be able to add a checklist to a non-existing checklist', async () => {
    await expect(
      addItemToBugChecklist.execute({
        checklist_id: 'non-existing-checklist',
        text: 'Responsividade na dashboard',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
