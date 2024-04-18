import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1713402029573 implements MigrationInterface {
    name = 'Table1713402029573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cohorts" DROP CONSTRAINT "FK_9c1e2bc1835cd6959388fd6d5b4"`);
        await queryRunner.query(`ALTER TABLE "instructors_period_of_days" DROP CONSTRAINT "FK_b8e10ac257d165f29c5d0ed657b"`);
        await queryRunner.query(`ALTER TABLE "courses_instructors" DROP CONSTRAINT "FK_5ef0cc909d9a40d9fa204e7512a"`);
        await queryRunner.query(`ALTER TABLE "courses_instructors" DROP CONSTRAINT "FK_1c6a3c33136069c8bb33368f4e5"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "instructors" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "cohorts" ADD CONSTRAINT "FK_9c1e2bc1835cd6959388fd6d5b4" FOREIGN KEY ("intake_id") REFERENCES "intakes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructors_period_of_days" ADD CONSTRAINT "FK_b8e10ac257d165f29c5d0ed657b" FOREIGN KEY ("instructor_id") REFERENCES "instructors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses_instructors" ADD CONSTRAINT "FK_5ef0cc909d9a40d9fa204e7512a" FOREIGN KEY ("instructor_id") REFERENCES "instructors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses_instructors" ADD CONSTRAINT "FK_1c6a3c33136069c8bb33368f4e5" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses_instructors" DROP CONSTRAINT "FK_1c6a3c33136069c8bb33368f4e5"`);
        await queryRunner.query(`ALTER TABLE "courses_instructors" DROP CONSTRAINT "FK_5ef0cc909d9a40d9fa204e7512a"`);
        await queryRunner.query(`ALTER TABLE "instructors_period_of_days" DROP CONSTRAINT "FK_b8e10ac257d165f29c5d0ed657b"`);
        await queryRunner.query(`ALTER TABLE "cohorts" DROP CONSTRAINT "FK_9c1e2bc1835cd6959388fd6d5b4"`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "instructors" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "courses_instructors" ADD CONSTRAINT "FK_1c6a3c33136069c8bb33368f4e5" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses_instructors" ADD CONSTRAINT "FK_5ef0cc909d9a40d9fa204e7512a" FOREIGN KEY ("instructor_id") REFERENCES "instructors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructors_period_of_days" ADD CONSTRAINT "FK_b8e10ac257d165f29c5d0ed657b" FOREIGN KEY ("instructor_id") REFERENCES "instructors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cohorts" ADD CONSTRAINT "FK_9c1e2bc1835cd6959388fd6d5b4" FOREIGN KEY ("intake_id") REFERENCES "intakes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
