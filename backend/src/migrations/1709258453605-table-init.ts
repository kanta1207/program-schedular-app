import { MigrationInterface, QueryRunner } from "typeorm";

export class TableInit1709258453605 implements MigrationInterface {
    name = 'TableInit1709258453605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "master_contract_types" DROP COLUMN "maxHours"`);
        await queryRunner.query(`ALTER TABLE "master_contract_types" DROP COLUMN "minHours"`);
        await queryRunner.query(`ALTER TABLE "master_contract_types" ADD "max_hours" integer`);
        await queryRunner.query(`ALTER TABLE "master_contract_types" ADD "min_hours" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "master_contract_types" DROP COLUMN "min_hours"`);
        await queryRunner.query(`ALTER TABLE "master_contract_types" DROP COLUMN "max_hours"`);
        await queryRunner.query(`ALTER TABLE "master_contract_types" ADD "minHours" integer`);
        await queryRunner.query(`ALTER TABLE "master_contract_types" ADD "maxHours" integer`);
    }

}
