import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddLogoFieldToProjects1603984913730
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'projects',
      new TableColumn({
        name: 'logo',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('projects', 'logo');
  }
}
