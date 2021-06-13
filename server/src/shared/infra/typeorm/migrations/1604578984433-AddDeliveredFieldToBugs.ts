import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddDeliveredFieldToBugs1604578984433
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'bugs',
      new TableColumn({
        name: 'delivered',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('delivered', 'done');
  }
}
