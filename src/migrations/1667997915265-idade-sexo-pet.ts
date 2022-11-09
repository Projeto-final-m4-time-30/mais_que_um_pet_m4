import { MigrationInterface, QueryRunner } from "typeorm";

export class idadeSexoPet1667997915265 implements MigrationInterface {
    name = 'idadeSexoPet1667997915265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" ADD "age" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pet" ADD "gender" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "age"`);
    }

}
