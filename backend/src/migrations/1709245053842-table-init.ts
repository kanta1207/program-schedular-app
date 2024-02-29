import { MigrationInterface, QueryRunner } from "typeorm";

export class TableInit1709245053842 implements MigrationInterface {
    name = 'TableInit1709245053842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "weekdays_ranges" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "PK_ae1dc80bfa5102ccfa6333f3e22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "master_classrooms" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "floor" character varying(255) NOT NULL, CONSTRAINT "PK_78deddebf346404eefba0571af7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "master_contract_types" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "maxHours" integer, "minHours" integer, CONSTRAINT "PK_53b07d1462211a6f18a97c07a66" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "master_periods_of_day" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "time" character varying NOT NULL, CONSTRAINT "PK_05c5bbc8628cd3a3e26785351c9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "master_periods_of_day"`);
        await queryRunner.query(`DROP TABLE "master_contract_types"`);
        await queryRunner.query(`DROP TABLE "master_classrooms"`);
        await queryRunner.query(`DROP TABLE "weekdays_ranges"`);
    }

}
