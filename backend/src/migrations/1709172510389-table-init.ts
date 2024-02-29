import { MigrationInterface, QueryRunner } from "typeorm";

export class TableInit1709172510389 implements MigrationInterface {
    name = 'TableInit1709172510389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."weekdays_ranges_name_enum" RENAME TO "weekdays_ranges_name_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."weekdays_ranges_name_enum" AS ENUM('Mon - Fri', 'Mon - Wed', 'Wed - Fri')`);
        await queryRunner.query(`ALTER TABLE "weekdays_ranges" ALTER COLUMN "name" TYPE "public"."weekdays_ranges_name_enum" USING "name"::"text"::"public"."weekdays_ranges_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."weekdays_ranges_name_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."weekdays_ranges_name_enum_old" AS ENUM('Monday - Friday', 'Monday - Wednesday', 'Wednesday - Friday')`);
        await queryRunner.query(`ALTER TABLE "weekdays_ranges" ALTER COLUMN "name" TYPE "public"."weekdays_ranges_name_enum_old" USING "name"::"text"::"public"."weekdays_ranges_name_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."weekdays_ranges_name_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."weekdays_ranges_name_enum_old" RENAME TO "weekdays_ranges_name_enum"`);
    }

}
