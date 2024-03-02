import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1709350034462 implements MigrationInterface {
    name = 'Table1709350034462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes" ADD "instructor_id" integer`);
        await queryRunner.query(`ALTER TABLE "classes" ADD CONSTRAINT "FK_d454f4606fdd87bc6267683b8bc" FOREIGN KEY ("instructor_id") REFERENCES "instructors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes" DROP CONSTRAINT "FK_d454f4606fdd87bc6267683b8bc"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "instructor_id"`);
    }

}
