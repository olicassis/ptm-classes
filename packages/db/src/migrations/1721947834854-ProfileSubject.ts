import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class ProfileSubject1721947834854 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'profile_subject',
      columns: [
        { name: 'id', type: 'uuid', isGenerated: true, isPrimary: true },
        { name: 'profile_id', type: 'uuid', isNullable: false },
        { name: 'label', type: 'varchar', isNullable: false },
        { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
        { name: 'deleted_at', type: 'timestamp' },
      ],
    })

    await queryRunner.createTable(table)

    await queryRunner.createForeignKey(
      table,
      new TableForeignKey({
        name: 'FK_PROFILE_ID',
        columnNames: ['profile_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'profile',
        onDelete: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = 'profile_subject'
    await queryRunner.dropForeignKey(table, 'FK_PROFILE_ID')
    await queryRunner.dropTable(table)
  }
}
