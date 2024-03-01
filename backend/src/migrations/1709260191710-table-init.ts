import { MigrationInterface, QueryRunner } from "typeorm";

export class TableInit1709260191710 implements MigrationInterface {
    name = 'TableInit1709260191710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "master_weekdays_ranges" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "PK_9f844c55c715f6e3433fd5e9371" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "master_weekdays_ranges"`);
    }

}
