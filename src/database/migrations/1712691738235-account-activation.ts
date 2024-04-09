import { MigrationInterface, QueryRunner } from 'typeorm';

export class AccountActivation1712691738235 implements MigrationInterface {
  name = 'AccountActivation1712691738235';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "account_activation" ("userId" uuid NOT NULL, "activationCode" character varying NOT NULL, CONSTRAINT "PK_16c76d3776b6c60434de05dd314" PRIMARY KEY ("userId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_activation" ADD CONSTRAINT "FK_16c76d3776b6c60434de05dd314" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_activation" DROP CONSTRAINT "FK_16c76d3776b6c60434de05dd314"`,
    );
    await queryRunner.query(`DROP TABLE "account_activation"`);
  }
}
