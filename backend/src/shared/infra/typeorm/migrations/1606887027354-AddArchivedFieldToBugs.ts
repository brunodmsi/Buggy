import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddArchivedFieldToBugs1606887027354
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'bugs',
      new TableColumn({
        name: 'archived',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('bugs', 'archived');
  }
}
