import { MigrationInterface, QueryRunner } from 'typeorm';

export class Table1709335718089 implements MigrationInterface {
  name = 'Table1709335718089';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "intakes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "start_at" TIMESTAMP NOT NULL, "end_at" TIMESTAMP NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "PK_a90d2ecf82eb04f663a52d34fef" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "courses_instructors" ("id" SERIAL NOT NULL, "instructor_id" integer, "course_id" integer, CONSTRAINT "PK_168b217d09e41dc0305c1ebc512" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(255) NOT NULL, "required_hours" integer NOT NULL, "program_id" integer, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "classes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "start_at" TIMESTAMP NOT NULL, "end_at" TIMESTAMP NOT NULL, "cohort_id" integer, "range_id" integer, "course_id" integer, "classroom_id" integer, CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "instructors" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "note" text NOT NULL, "desired_working_hours" integer, "contract_type_id" integer, "range_id" integer, CONSTRAINT "PK_95e3da69ca76176ea4ab8435098" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "instructors_period_of_days" ("id" SERIAL NOT NULL, "instructor_id" integer, "period_of_day_id" integer, CONSTRAINT "PK_a5692adbb663ad58880a41162dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cohorts" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "intake_id" integer, "period_of_day_id" integer, "program_id" integer, CONSTRAINT "PK_fd38f76b135e907b834fda1e752" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "programs" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, CONSTRAINT "PK_d43c664bcaafc0e8a06dfd34e05" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_instructors" ADD CONSTRAINT "FK_5ef0cc909d9a40d9fa204e7512a" FOREIGN KEY ("instructor_id") REFERENCES "instructors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_instructors" ADD CONSTRAINT "FK_1c6a3c33136069c8bb33368f4e5" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course" ADD CONSTRAINT "FK_b119153e3c1b0cc68ae086f265d" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD CONSTRAINT "FK_ddedf3ef47019db34bfc0b7bc71" FOREIGN KEY ("cohort_id") REFERENCES "cohorts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD CONSTRAINT "FK_fe5b699a6858248f61d0017cac9" FOREIGN KEY ("range_id") REFERENCES "master_weekdays_ranges"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD CONSTRAINT "FK_bd4c6c725acd427f07264770ceb" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD CONSTRAINT "FK_7400a31f7e26c287426c2e999a8" FOREIGN KEY ("classroom_id") REFERENCES "master_classrooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructors" ADD CONSTRAINT "FK_b304fe9a3ecebfce78de4cbfbfe" FOREIGN KEY ("contract_type_id") REFERENCES "master_contract_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructors" ADD CONSTRAINT "FK_9fe1277e50eb5a58ee31c837efa" FOREIGN KEY ("range_id") REFERENCES "master_weekdays_ranges"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructors_period_of_days" ADD CONSTRAINT "FK_b8e10ac257d165f29c5d0ed657b" FOREIGN KEY ("instructor_id") REFERENCES "instructors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructors_period_of_days" ADD CONSTRAINT "FK_860cb5d0b590ba07a73d019a07a" FOREIGN KEY ("period_of_day_id") REFERENCES "master_period_of_days"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cohorts" ADD CONSTRAINT "FK_9c1e2bc1835cd6959388fd6d5b4" FOREIGN KEY ("intake_id") REFERENCES "intakes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cohorts" ADD CONSTRAINT "FK_378c9a6f49ab499a20f328de5b0" FOREIGN KEY ("period_of_day_id") REFERENCES "master_period_of_days"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cohorts" ADD CONSTRAINT "FK_d8e49c656a43855ec1b0f1ff1b5" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cohorts" DROP CONSTRAINT "FK_d8e49c656a43855ec1b0f1ff1b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cohorts" DROP CONSTRAINT "FK_378c9a6f49ab499a20f328de5b0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cohorts" DROP CONSTRAINT "FK_9c1e2bc1835cd6959388fd6d5b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructors_period_of_days" DROP CONSTRAINT "FK_860cb5d0b590ba07a73d019a07a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructors_period_of_days" DROP CONSTRAINT "FK_b8e10ac257d165f29c5d0ed657b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructors" DROP CONSTRAINT "FK_9fe1277e50eb5a58ee31c837efa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructors" DROP CONSTRAINT "FK_b304fe9a3ecebfce78de4cbfbfe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" DROP CONSTRAINT "FK_7400a31f7e26c287426c2e999a8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" DROP CONSTRAINT "FK_bd4c6c725acd427f07264770ceb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" DROP CONSTRAINT "FK_fe5b699a6858248f61d0017cac9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" DROP CONSTRAINT "FK_ddedf3ef47019db34bfc0b7bc71"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course" DROP CONSTRAINT "FK_b119153e3c1b0cc68ae086f265d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_instructors" DROP CONSTRAINT "FK_1c6a3c33136069c8bb33368f4e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_instructors" DROP CONSTRAINT "FK_5ef0cc909d9a40d9fa204e7512a"`,
    );
    await queryRunner.query(`DROP TABLE "programs"`);
    await queryRunner.query(`DROP TABLE "cohorts"`);
    await queryRunner.query(`DROP TABLE "instructors_period_of_days"`);
    await queryRunner.query(`DROP TABLE "instructors"`);
    await queryRunner.query(`DROP TABLE "classes"`);
    await queryRunner.query(`DROP TABLE "course"`);
    await queryRunner.query(`DROP TABLE "courses_instructors"`);
    await queryRunner.query(`DROP TABLE "intakes"`);
  }
}
