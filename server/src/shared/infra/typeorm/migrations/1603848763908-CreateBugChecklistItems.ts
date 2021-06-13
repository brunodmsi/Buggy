import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateBugChecklistItems1603848763908
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bug_checklist_items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'checklist_id',
            type: 'uuid',
          },
          {
            name: 'text',
            type: 'varchar',
          },
          {
            name: 'done',
            type: 'boolean',
            default: false,
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
            name: 'BugChecklistItem',
            referencedTableName: 'bug_checklists',
            referencedColumnNames: ['id'],
            columnNames: ['checklist_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bug_checklist_items');
  }
}
