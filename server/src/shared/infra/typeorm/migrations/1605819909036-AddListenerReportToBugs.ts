import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddListenerReportToBug1605819909036
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'bugs',
      new TableColumn({
        name: 'listener_report_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'bugs',
      new TableForeignKey({
        name: 'BugListenerReport',
        columnNames: ['listener_report_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'listener_reports',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('bugs', 'listener_report_id');

    await queryRunner.dropForeignKey('bugs', 'BugListenerReport');
  }
}
