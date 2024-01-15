import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigration1705082663199 implements MigrationInterface {
    name = 'DbMigration1705082663199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "cid" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cid"`);
    }

}
