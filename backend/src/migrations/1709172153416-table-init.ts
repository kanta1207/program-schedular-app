import { MigrationInterface, QueryRunner } from "typeorm";

export class TableInit1709172153416 implements MigrationInterface {
    name = 'TableInit1709172153416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."master_contract_types_name_enum" AS ENUM('Full time', 'Part time', 'Contract')`);
        await queryRunner.query(`CREATE TABLE "master_contract_types" ("id" SERIAL NOT NULL, "name" "public"."master_contract_types_name_enum" NOT NULL, "maxHours" integer, "minHours" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_53b07d1462211a6f18a97c07a66" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."weekdays_ranges_name_enum" AS ENUM('Monday - Friday', 'Monday - Wednesday', 'Wednesday - Friday')`);
        await queryRunner.query(`CREATE TABLE "weekdays_ranges" ("id" SERIAL NOT NULL, "name" "public"."weekdays_ranges_name_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ae1dc80bfa5102ccfa6333f3e22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."master_periods_of_day_name_enum" AS ENUM('Morning', 'Afternoon', 'Evening')`);
        await queryRunner.query(`CREATE TABLE "master_periods_of_day" ("id" SERIAL NOT NULL, "name" "public"."master_periods_of_day_name_enum" NOT NULL, "time" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_05c5bbc8628cd3a3e26785351c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."master_classrooms_name_enum" AS ENUM('Google', 'Youtube', 'Uber', 'Amazon', 'Facebook', 'Apple', 'Hootsuite', 'Microsoft')`);
        await queryRunner.query(`CREATE TYPE "public"."master_classrooms_floor_enum" AS ENUM('2nd', '3rd', '4th')`);
        await queryRunner.query(`CREATE TABLE "master_classrooms" ("id" SERIAL NOT NULL, "name" "public"."master_classrooms_name_enum" NOT NULL, "floor" "public"."master_classrooms_floor_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_78deddebf346404eefba0571af7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "master_classrooms"`);
        await queryRunner.query(`DROP TYPE "public"."master_classrooms_floor_enum"`);
        await queryRunner.query(`DROP TYPE "public"."master_classrooms_name_enum"`);
        await queryRunner.query(`DROP TABLE "master_periods_of_day"`);
        await queryRunner.query(`DROP TYPE "public"."master_periods_of_day_name_enum"`);
        await queryRunner.query(`DROP TABLE "weekdays_ranges"`);
        await queryRunner.query(`DROP TYPE "public"."weekdays_ranges_name_enum"`);
        await queryRunner.query(`DROP TABLE "master_contract_types"`);
        await queryRunner.query(`DROP TYPE "public"."master_contract_types_name_enum"`);
    }

}
