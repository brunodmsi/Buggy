import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import FakeUserProjectsRepository from '@modules/projects/repositories/fakes/FakeUserProjectsRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeBugsRepository from '../repositories/fakes/FakeBugsRepository';
import FakeBugChecklistItemsRepository from '../repositories/fakes/FakeBugChecklistItemsRepository';
import ChangeChecklistItemStatusService from './ChangeChecklistItemStatusService';
import FakeBugChecklistsRepository from '../repositories/fakes/FakeBugChecklistsRepository';
import CreateBugService from './CreateBugService';
import AddItemToBugChecklistService from './AddItemToBugChecklistService';

let fakeBugsRepository: FakeBugsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeProjectsRepository: FakeProjectsRepository;
let fakeUserProjectsRepository: FakeUserProjectsRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeBugChecklistItemsRepository: FakeBugChecklistItemsRepository;
let fakeBugChecklistsRepository: FakeBugChecklistsRepository;
let createBug: CreateBugService;
let createProject: CreateProjectService;
let addItemToBugChecklist: AddItemToBugChecklistService;
let changeChecklistItemStatus: ChangeChecklistItemStatusService;

describe('ChangeChecklistItemStatus', () => {
  beforeEach(() => {
    fakeBugsRepository = new FakeBugsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeUserProjectsRepository = new FakeUserProjectsRepository();
    fakeBugChecklistsRepository = new FakeBugChecklistsRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeBugChecklistItemsRepository = new FakeBugChecklistItemsRepository();

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

    changeChecklistItemStatus = new ChangeChecklistItemStatusService(
      fakeBugChecklistItemsRepository,
    );

    addItemToBugChecklist = new AddItemToBugChecklistService(
      fakeBugChecklistsRepository,
      fakeBugChecklistItemsRepository,
    );
  });

  it('should be able to change a item status', async () => {
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

    const item = await addItemToBugChecklist.execute({
      checklist_id: bugChecklist.id,
      text: 'Responsividade na dashboard',
    });

    await changeChecklistItemStatus.execute({
      checklist_item_id: item.id,
      status: true,
    });

    expect(item.done).toEqual(true);
  });

  it('should not be able to change a description of non-existing bug', async () => {
    await expect(
      changeChecklistItemStatus.execute({
        checklist_item_id: 'non-existing-item',
        status: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
