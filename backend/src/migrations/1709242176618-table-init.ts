import { MigrationInterface, QueryRunner } from "typeorm";

export class TableInit1709242176618 implements MigrationInterface {
    name = 'TableInit1709242176618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "master_classrooms" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "master_classrooms" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "master_periods_of_day" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "master_periods_of_day" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "master_contract_types" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "master_contract_types" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "weekdays_ranges" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "weekdays_ranges" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "master_classrooms" DROP COLUMN "name"`);
        await queryRunner.query(`DROP TYPE "public"."master_classrooms_name_enum"`);
        await queryRunner.query(`ALTER TABLE "master_classrooms" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "master_classrooms" DROP COLUMN "floor"`);
        await queryRunner.query(`DROP TYPE "public"."master_classrooms_floor_enum"`);
        await queryRunner.query(`ALTER TABLE "master_classrooms" ADD "floor" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "master_periods_of_day" DROP COLUMN "name"`);
        await queryRunner.query(`DROP TYPE "public"."master_periods_of_day_name_enum"`);
        await queryRunner.query(`ALTER TABLE "master_periods_of_day" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "master_contract_types" DROP COLUMN "name"`);
        await queryRunner.query(`DROP TYPE "public"."master_contract_types_name_enum"`);
        await queryRunner.query(`ALTER TABLE "master_contract_types" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weekdays_ranges" DROP COLUMN "name"`);
        await queryRunner.query(`DROP TYPE "public"."weekdays_ranges_name_enum"`);
        await queryRunner.query(`ALTER TABLE "weekdays_ranges" ADD "name" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weekdays_ranges" DROP COLUMN "name"`);
        await queryRunner.query(`CREATE TYPE "public"."weekdays_ranges_name_enum" AS ENUM('Mon - Fri', 'Mon - Wed', 'Wed - Fri')`);
        await queryRunner.query(`ALTER TABLE "weekdays_ranges" ADD "name" "public"."weekdays_ranges_name_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "master_contract_types" DROP COLUMN "name"`);
        await queryRunner.query(`CREATE TYPE "public"."master_contract_types_name_enum" AS ENUM('Full time', 'Part time', 'Contract')`);
        await queryRunner.query(`ALTER TABLE "master_contract_types" ADD "name" "public"."master_contract_types_name_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "master_periods_of_day" DROP COLUMN "name"`);
        await queryRunner.query(`CREATE TYPE "public"."master_periods_of_day_name_enum" AS ENUM('Morning', 'Afternoon', 'Evening')`);
        await queryRunner.query(`ALTER TABLE "master_periods_of_day" ADD "name" "public"."master_periods_of_day_name_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "master_classrooms" DROP COLUMN "floor"`);
        await queryRunner.query(`CREATE TYPE "public"."master_classrooms_floor_enum" AS ENUM('2nd', '3rd', '4th')`);
        await queryRunner.query(`ALTER TABLE "master_classrooms" ADD "floor" "public"."master_classrooms_floor_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "master_classrooms" DROP COLUMN "name"`);
        await queryRunner.query(`CREATE TYPE "public"."master_classrooms_name_enum" AS ENUM('Google', 'Youtube', 'Uber', 'Amazon', 'Facebook', 'Apple', 'Hootsuite', 'Microsoft')`);
        await queryRunner.query(`ALTER TABLE "master_classrooms" ADD "name" "public"."master_classrooms_name_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weekdays_ranges" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "weekdays_ranges" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "master_contract_types" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "master_contract_types" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "master_periods_of_day" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "master_periods_of_day" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "master_classrooms" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "master_classrooms" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
