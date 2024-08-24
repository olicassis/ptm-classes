import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm'

export class AddUniqueConstraintToSubjectLabel1724456616222
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      'profile_subject',
      new TableIndex({
        name: 'IDX_PROFILE_SUBJECT_LABEL_UNIQUE',
        columnNames: ['profile_id', 'label'],
        isUnique: true,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(
      'profile_subject',
      'IDX_PROFILE_SUBJECT_LABEL_UNIQUE',
    )
  }
}
