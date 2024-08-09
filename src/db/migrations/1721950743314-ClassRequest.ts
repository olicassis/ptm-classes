import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm'

export class ClassRequest1721950743314 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'class_request',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isGenerated: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
          isPrimary: true,
        },
        { name: 'student_profile_id', type: 'uuid' },
        { name: 'teacher_profile_id', type: 'uuid' },
        { name: 'profile_schedule_id', type: 'uuid' },
        { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
        { name: 'deleted_at', type: 'timestamp', isNullable: true },
      ],
    })

    await queryRunner.createTable(table)

    await queryRunner.createForeignKey(
      table,
      new TableForeignKey({
        name: 'FK_PROFILE_SCHEDULE',
        columnNames: ['profile_schedule_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'profile_schedule',
      }),
    )

    await queryRunner.createIndex(
      table,
      new TableIndex({
        name: 'IDX_CLASS_REQUEST_UNIQUE',
        columnNames: [
          'student_profile_id',
          'teacher_profile_id',
          'profile_schedule_id',
        ],
        isUnique: true,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = 'class_request'
    await queryRunner.dropIndex(table, 'IDX_CLASS_REQUEST_UNIQUE')
    await queryRunner.dropForeignKey(table, 'FK_PROFILE_SCHEDULE')
    await queryRunner.dropTable(table)
  }
}
