import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddUrlProtocolToListenerReport1606331823317
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'listener_reports',
      new TableColumn({
        name: 'request_url_protocol',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('listener_reports', 'request_url_protocol');
  }
}
