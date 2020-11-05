import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPriorityToBug1604606600560
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'bugs',
      new TableColumn({
        name: 'priority',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('delivered', 'done');
  }
}
