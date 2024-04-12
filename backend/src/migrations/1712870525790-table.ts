import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1712870525790 implements MigrationInterface {
    name = 'Table1712870525790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programs" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "deleted_at"`);
    }

}
