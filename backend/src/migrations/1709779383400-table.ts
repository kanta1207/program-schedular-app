import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1709779383400 implements MigrationInterface {
    name = 'Table1709779383400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses_instructors" DROP CONSTRAINT "FK_5ef0cc909d9a40d9fa204e7512a"`);
        await queryRunner.query(`ALTER TABLE "courses_instructors" DROP CONSTRAINT "FK_1c6a3c33136069c8bb33368f4e5"`);
        await queryRunner.query(`ALTER TABLE "courses_instructors" ALTER COLUMN "instructor_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses_instructors" ALTER COLUMN "course_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_ef3a23e394203eb11b06b77f695"`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "program_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "instructors_period_of_days" DROP CONSTRAINT "FK_b8e10ac257d165f29c5d0ed657b"`);
        await queryRunner.query(`ALTER TABLE "instructors_period_of_days" DROP CONSTRAINT "FK_860cb5d0b590ba07a73d019a07a"`);
        await queryRunner.query(`ALTER TABLE "instructors_period_of_days" ALTER COLUMN "instructor_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "instructors_period_of_days" ALTER COLUMN "period_of_day_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classes" DROP CONSTRAINT "FK_ddedf3ef47019db34bfc0b7bc71"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP CONSTRAINT "FK_fe5b699a6858248f61d0017cac9"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP CONSTRAINT "FK_bd4c6c725acd427f07264770ceb"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP CONSTRAINT "FK_7400a31f7e26c287426c2e999a8"`);
        await queryRunner.query(`ALTER TABLE "classes" ALTER COLUMN "cohort_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classes" ALTER COLUMN "range_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classes" ALTER COLUMN "course_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classes" ALTER COLUMN "classroom_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "instructors" DROP CONSTRAINT "FK_b304fe9a3ecebfce78de4cbfbfe"`);
        await queryRunner.query(`ALTER TABLE "instructors" DROP CONSTRAINT "FK_9fe1277e50eb5a58ee31c837efa"`);
        await queryRunner.query(`ALTER TABLE "instructors" ALTER COLUMN "contract_type_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "instructors" ALTER COLUMN "range_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses_instructors" ADD CONSTRAINT "FK_5ef0cc909d9a40d9fa204e7512a" FOREIGN KEY ("instructor_id") REFERENCES "instructors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses_instructors" ADD CONSTRAINT "FK_1c6a3c33136069c8bb33368f4e5" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_ef3a23e394203eb11b06b77f695" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructors_period_of_days" ADD CONSTRAINT "FK_b8e10ac257d165f29c5d0ed657b" FOREIGN KEY ("instructor_id") REFERENCES "instructors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructors_period_of_days" ADD CONSTRAINT "FK_860cb5d0b590ba07a73d019a07a" FOREIGN KEY ("period_of_day_id") REFERENCES "master_period_of_days"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classes" ADD CONSTRAINT "FK_ddedf3ef47019db34bfc0b7bc71" FOREIGN KEY ("cohort_id") REFERENCES "cohorts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classes" ADD CONSTRAINT "FK_fe5b699a6858248f61d0017cac9" FOREIGN KEY ("range_id") REFERENCES "master_weekdays_ranges"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classes" ADD CONSTRAINT "FK_bd4c6c725acd427f07264770ceb" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classes" ADD CONSTRAINT "FK_7400a31f7e26c287426c2e999a8" FOREIGN KEY ("classroom_id") REFERENCES "master_classrooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructors" ADD CONSTRAINT "FK_b304fe9a3ecebfce78de4cbfbfe" FOREIGN KEY ("contract_type_id") REFERENCES "master_contract_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructors" ADD CONSTRAINT "FK_9fe1277e50eb5a58ee31c837efa" FOREIGN KEY ("range_id") REFERENCES "master_weekdays_ranges"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instructors" DROP CONSTRAINT "FK_9fe1277e50eb5a58ee31c837efa"`);
        await queryRunner.query(`ALTER TABLE "instructors" DROP CONSTRAINT "FK_b304fe9a3ecebfce78de4cbfbfe"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP CONSTRAINT "FK_7400a31f7e26c287426c2e999a8"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP CONSTRAINT "FK_bd4c6c725acd427f07264770ceb"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP CONSTRAINT "FK_fe5b699a6858248f61d0017cac9"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP CONSTRAINT "FK_ddedf3ef47019db34bfc0b7bc71"`);
        await queryRunner.query(`ALTER TABLE "instructors_period_of_days" DROP CONSTRAINT "FK_860cb5d0b590ba07a73d019a07a"`);
        await queryRunner.query(`ALTER TABLE "instructors_period_of_days" DROP CONSTRAINT "FK_b8e10ac257d165f29c5d0ed657b"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_ef3a23e394203eb11b06b77f695"`);
        await queryRunner.query(`ALTER TABLE "courses_instructors" DROP CONSTRAINT "FK_1c6a3c33136069c8bb33368f4e5"`);
        await queryRunner.query(`ALTER TABLE "courses_instructors" DROP CONSTRAINT "FK_5ef0cc909d9a40d9fa204e7512a"`);
        await queryRunner.query(`ALTER TABLE "instructors" ALTER COLUMN "range_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "instructors" ALTER COLUMN "contract_type_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "instructors" ADD CONSTRAINT "FK_9fe1277e50eb5a58ee31c837efa" FOREIGN KEY ("range_id") REFERENCES "master_weekdays_ranges"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructors" ADD CONSTRAINT "FK_b304fe9a3ecebfce78de4cbfbfe" FOREIGN KEY ("contract_type_id") REFERENCES "master_contract_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classes" ALTER COLUMN "classroom_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classes" ALTER COLUMN "course_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classes" ALTER COLUMN "range_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classes" ALTER COLUMN "cohort_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classes" ADD CONSTRAINT "FK_7400a31f7e26c287426c2e999a8" FOREIGN KEY ("classroom_id") REFERENCES "master_classrooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classes" ADD CONSTRAINT "FK_bd4c6c725acd427f07264770ceb" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classes" ADD CONSTRAINT "FK_fe5b699a6858248f61d0017cac9" FOREIGN KEY ("range_id") REFERENCES "master_weekdays_ranges"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classes" ADD CONSTRAINT "FK_ddedf3ef47019db34bfc0b7bc71" FOREIGN KEY ("cohort_id") REFERENCES "cohorts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructors_period_of_days" ALTER COLUMN "period_of_day_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "instructors_period_of_days" ALTER COLUMN "instructor_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "instructors_period_of_days" ADD CONSTRAINT "FK_860cb5d0b590ba07a73d019a07a" FOREIGN KEY ("period_of_day_id") REFERENCES "master_period_of_days"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructors_period_of_days" ADD CONSTRAINT "FK_b8e10ac257d165f29c5d0ed657b" FOREIGN KEY ("instructor_id") REFERENCES "instructors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "program_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_ef3a23e394203eb11b06b77f695" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses_instructors" ALTER COLUMN "course_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses_instructors" ALTER COLUMN "instructor_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses_instructors" ADD CONSTRAINT "FK_1c6a3c33136069c8bb33368f4e5" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses_instructors" ADD CONSTRAINT "FK_5ef0cc909d9a40d9fa204e7512a" FOREIGN KEY ("instructor_id") REFERENCES "instructors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
