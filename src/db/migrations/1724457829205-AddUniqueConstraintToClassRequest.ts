import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm'

export class AddUniqueConstraintToClassRequest1724457829205
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      'class_request',
      new TableIndex({
        name: 'IDX_CLASS_REQUEST_UNIQUE',
        columnNames: ['student_profile_id', 'profile_schedule_id'],
        isUnique: true,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('class_request', 'IDX_CLASS_REQUEST_UNIQUE')
  }
}
