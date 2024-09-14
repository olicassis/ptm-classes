import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

export class Profile1721687853560 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'profile',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isGenerated: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
          isPrimary: true,
        },
        { name: 'first_name', type: 'varchar' },
        { name: 'last_name', type: 'varchar' },
        { name: 'avatar', type: 'varchar', isNullable: true, isUnique: true },
        {
          name: 'username',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'role',
          type: 'enum',
          enum: ['student', 'teacher'],
          isNullable: true,
        },
        {
          name: 'status',
          type: 'enum',
          enum: ['unverified', 'verified'],
          default: `'unverified'`,
        },
        { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
        { name: 'deleted_at', type: 'timestamp', isNullable: true },
      ],
    })
    await queryRunner.createTable(table, true)

    await queryRunner.createIndex(
      table,
      new TableIndex({
        name: 'IDX_PROFILE_FIRST_NAME',
        columnNames: ['first_name'],
      }),
    )

    await queryRunner.createIndex(
      table,
      new TableIndex({
        name: 'IDX_PROFILE_LAST_NAME',
        columnNames: ['last_name'],
      }),
    )

    await queryRunner.createIndex(
      table,
      new TableIndex({
        name: 'IDX_PROFILE_USERNAME',
        columnNames: ['username'],
      }),
    )

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = now();
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `)

    await queryRunner.query(`
      CREATE TRIGGER update_updated_at
      BEFORE UPDATE ON profile
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = 'profile'
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS update_updated_at ON ${table}`,
    )
    await queryRunner.query('DROP FUNCTION IF EXISTS update_updated_at_column')
    await queryRunner.dropIndex(table, 'IDX_PROFILE_FIRST_NAME')
    await queryRunner.dropIndex(table, 'IDX_PROFILE_LAST_NAME')
    await queryRunner.dropIndex(table, 'IDX_PROFILE_USERNAME')
    await queryRunner.dropTable(table)
  }
}
