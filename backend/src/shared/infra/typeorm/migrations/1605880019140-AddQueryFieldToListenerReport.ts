import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddQueryFieldToListenerReport1605880019140
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'listener_reports',
      new TableColumn({
        name: 'query',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('listener_reports', 'query');
  }
}
