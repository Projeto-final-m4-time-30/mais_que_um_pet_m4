import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667836697911 implements MigrationInterface {
    name = 'createTables1667836697911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" ADD "user_register" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "user_register"`);
    }

}
