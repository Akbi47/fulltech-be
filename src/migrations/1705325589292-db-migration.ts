import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigration1705325589292 implements MigrationInterface {
    name = 'DbMigration1705325589292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "image" character varying DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "image" character varying DEFAULT ''`);
    }

}
