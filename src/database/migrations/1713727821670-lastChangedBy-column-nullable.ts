import { MigrationInterface, QueryRunner } from 'typeorm';

export class LastChangedByColumnNullable1713727821670
  implements MigrationInterface
{
  name = 'LastChangedByColumnNullable1713727821670';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "lastChangedBy" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "lastChangedBy" SET NOT NULL`,
    );
  }
}
