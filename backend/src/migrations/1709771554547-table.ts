import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1709771554547 implements MigrationInterface {
    name = 'Table1709771554547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cohorts" DROP CONSTRAINT "FK_9c1e2bc1835cd6959388fd6d5b4"`);
        await queryRunner.query(`ALTER TABLE "cohorts" DROP CONSTRAINT "FK_378c9a6f49ab499a20f328de5b0"`);
        await queryRunner.query(`ALTER TABLE "cohorts" DROP CONSTRAINT "FK_d8e49c656a43855ec1b0f1ff1b5"`);
        await queryRunner.query(`ALTER TABLE "cohorts" ALTER COLUMN "intake_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cohorts" ALTER COLUMN "period_of_day_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cohorts" ALTER COLUMN "program_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cohorts" ADD CONSTRAINT "FK_9c1e2bc1835cd6959388fd6d5b4" FOREIGN KEY ("intake_id") REFERENCES "intakes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cohorts" ADD CONSTRAINT "FK_378c9a6f49ab499a20f328de5b0" FOREIGN KEY ("period_of_day_id") REFERENCES "master_period_of_days"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cohorts" ADD CONSTRAINT "FK_d8e49c656a43855ec1b0f1ff1b5" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cohorts" DROP CONSTRAINT "FK_d8e49c656a43855ec1b0f1ff1b5"`);
        await queryRunner.query(`ALTER TABLE "cohorts" DROP CONSTRAINT "FK_378c9a6f49ab499a20f328de5b0"`);
        await queryRunner.query(`ALTER TABLE "cohorts" DROP CONSTRAINT "FK_9c1e2bc1835cd6959388fd6d5b4"`);
        await queryRunner.query(`ALTER TABLE "cohorts" ALTER COLUMN "program_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cohorts" ALTER COLUMN "period_of_day_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cohorts" ALTER COLUMN "intake_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cohorts" ADD CONSTRAINT "FK_d8e49c656a43855ec1b0f1ff1b5" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cohorts" ADD CONSTRAINT "FK_378c9a6f49ab499a20f328de5b0" FOREIGN KEY ("period_of_day_id") REFERENCES "master_period_of_days"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cohorts" ADD CONSTRAINT "FK_9c1e2bc1835cd6959388fd6d5b4" FOREIGN KEY ("intake_id") REFERENCES "intakes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
