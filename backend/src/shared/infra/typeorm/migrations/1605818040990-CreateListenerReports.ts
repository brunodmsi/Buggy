import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateListenerReport1605817433387
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'listener_reports',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'bug_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'message',
            type: 'varchar',
          },
          {
            name: 'stack_where',
            type: 'varchar',
          },
          {
            name: 'stack_line',
            type: 'varchar',
          },
          {
            name: 'error_query',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'request_body',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'request_method',
            type: 'varchar',
          },
          {
            name: 'request_url',
            type: 'varchar',
          },
          {
            name: 'request_url_path',
            type: 'varchar',
          },
          {
            name: 'request_headers',
            type: 'varchar',
          },
          {
            name: 'request_query',
            type: 'varchar',
          },
          {
            name: 'request_params',
            type: 'varchar',
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
            name: 'ListenerReportBug',
            referencedTableName: 'bugs',
            referencedColumnNames: ['id'],
            columnNames: ['bug_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('listener_reports');
  }
}
