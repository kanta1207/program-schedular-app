import { MigrationInterface, QueryRunner } from "typeorm";

export class TableInit1709190926679 implements MigrationInterface {
    name = 'TableInit1709190926679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "breaks" ("id" SERIAL NOT NULL, "startAt" date NOT NULL, "endAt" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cc0e8a24c815804239ea5cbad9a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "breaks"`);
    }

}
