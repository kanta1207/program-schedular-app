import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableInit1709329277280 implements MigrationInterface {
  name = 'TableInit1709329277280';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "master_weekdays_ranges" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "PK_9f844c55c715f6e3433fd5e9371" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "master_classrooms" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "floor" character varying(255) NOT NULL, CONSTRAINT "PK_78deddebf346404eefba0571af7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "master_period_of_days" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "time" character varying NOT NULL, CONSTRAINT "PK_c9578e347e642caa1ef09affa10" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "master_contract_types" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "max_hours" integer, "min_hours" integer, CONSTRAINT "PK_53b07d1462211a6f18a97c07a66" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "master_contract_types"`);
    await queryRunner.query(`DROP TABLE "master_period_of_days"`);
    await queryRunner.query(`DROP TABLE "master_classrooms"`);
    await queryRunner.query(`DROP TABLE "master_weekdays_ranges"`);
  }
}
