import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeBugIdInListenerReports1605878077739
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'listener_reports',
      'bug_id',
      new TableColumn({
        name: 'bug_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'listener_reports',
      'bug_id',
      new TableColumn({
        name: 'bug_id',
        type: 'uuid',
      }),
    );
  }
}
