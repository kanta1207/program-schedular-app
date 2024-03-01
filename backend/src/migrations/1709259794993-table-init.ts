import { MigrationInterface, QueryRunner } from "typeorm";

export class TableInit1709259794993 implements MigrationInterface {
    name = 'TableInit1709259794993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "master_period_of_days" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "time" character varying NOT NULL, CONSTRAINT "PK_c9578e347e642caa1ef09affa10" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "master_period_of_days"`);
    }

}
