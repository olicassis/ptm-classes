import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableIndex,
} from 'typeorm'

export class RemoveTeacherProfileIdFromClassRequest1722091754065
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = 'class_request'
    const idx = 'IDX_CLASS_REQUEST_UNIQUE'
    await queryRunner.dropIndex(table, idx)
    await queryRunner.dropColumn(table, 'teacher_profile_id')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = 'class_request'
    await queryRunner.addColumn(
      table,
      new TableColumn({
        name: 'teacher_profile_id',
        type: 'uuid',
        isNullable: false,
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
}
