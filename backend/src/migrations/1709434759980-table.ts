import { MigrationInterface, QueryRunner } from 'typeorm';

export class Table1709434759980 implements MigrationInterface {
  name = 'Table1709434759980';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cohorts" DROP CONSTRAINT "FK_9c1e2bc1835cd6959388fd6d5b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" DROP CONSTRAINT "FK_ddedf3ef47019db34bfc0b7bc71"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cohorts" ADD CONSTRAINT "FK_9c1e2bc1835cd6959388fd6d5b4" FOREIGN KEY ("intake_id") REFERENCES "intakes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD CONSTRAINT "FK_ddedf3ef47019db34bfc0b7bc71" FOREIGN KEY ("cohort_id") REFERENCES "cohorts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "classes" DROP CONSTRAINT "FK_ddedf3ef47019db34bfc0b7bc71"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cohorts" DROP CONSTRAINT "FK_9c1e2bc1835cd6959388fd6d5b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD CONSTRAINT "FK_ddedf3ef47019db34bfc0b7bc71" FOREIGN KEY ("cohort_id") REFERENCES "cohorts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cohorts" ADD CONSTRAINT "FK_9c1e2bc1835cd6959388fd6d5b4" FOREIGN KEY ("intake_id") REFERENCES "intakes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
