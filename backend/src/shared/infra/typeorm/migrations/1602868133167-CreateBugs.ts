import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateBugs1602868133167 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bugs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'group',
            type: 'integer',
          },
          {
            name: 'status',
            type: 'integer',
          },
          {
            name: 'date_limit',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'project_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'BugProject',
            referencedTableName: 'projects',
            referencedColumnNames: ['id'],
            columnNames: ['project_id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bugs');
  }
}
