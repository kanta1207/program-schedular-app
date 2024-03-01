import { MigrationInterface, QueryRunner } from "typeorm";

export class TableInit1709330614121 implements MigrationInterface {
    name = 'TableInit1709330614121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "breaks" ("id" SERIAL NOT NULL, "start_at" date NOT NULL, "end_at" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cc0e8a24c815804239ea5cbad9a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "breaks"`);
    }

}
