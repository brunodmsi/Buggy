import FakeListenerReportsRepository from '../repositories/fakes/FakeListenerReportsRepository';
import CreateListenerReportService from './CreateListenerReportService';

let fakeListenerReportsRepository: FakeListenerReportsRepository;
let createListenerReport: CreateListenerReportService;

describe('CreateListenerReport', () => {
  beforeEach(() => {
    fakeListenerReportsRepository = new FakeListenerReportsRepository();

    createListenerReport = new CreateListenerReportService(
      fakeListenerReportsRepository,
    );
  });

  it('should be able to create a new listener report', async () => {
    const listenerReport = await createListenerReport.execute({
      name: 'Scient',
      message: 'X is not defined',
      stack_where: '/home/index.ts',
      stack_line: '12',
    });

    expect(listenerReport).toHaveProperty('id');
  });
});
