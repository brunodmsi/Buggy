import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddListenerKeyToProject1605818035031
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'projects',
      new TableColumn({
        name: 'listener_key',
        type: 'varchar',
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('projects', 'listener_key');
  }
}
