import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveColumnCreatedBy1713727518434 implements MigrationInterface {
  name = 'RemoveColumnCreatedBy1713727518434';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdBy"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "createdBy" character varying(300) NOT NULL`,
    );
  }
}
