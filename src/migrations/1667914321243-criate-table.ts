import { MigrationInterface, QueryRunner } from "typeorm";

export class criateTable1667914321243 implements MigrationInterface {
    name = 'criateTable1667914321243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying(8) NOT NULL, "city" character varying NOT NULL, "state" character varying(2) NOT NULL, "district" character varying NOT NULL, "number" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone" character varying NOT NULL, "secondary_email" character varying, "whatsapp" character varying, "description" character varying, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "info_pet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pet_image" character varying, "size" character varying NOT NULL, "color" character varying, "species" character varying NOT NULL, "description" character varying, "vaccine" character varying, CONSTRAINT "PK_895bbb741fdfde2ce2ea126fcbb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_image" character varying, "user_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "is_active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, "contactId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_217ba147c5de6c107f2fa7fa27" UNIQUE ("addressId"), CONSTRAINT "REL_6530f8ceb93f81306e5396384e" UNIQUE ("contactId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "is_adoptable" boolean NOT NULL, "is_active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_register" character varying NOT NULL, "infoPetId" uuid, "userId" uuid, CONSTRAINT "REL_ed20288ea48065bb8160128165" UNIQUE ("infoPetId"), CONSTRAINT "PK_b1ac2e88e89b9480e0c5b53fa60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6530f8ceb93f81306e5396384e8" FOREIGN KEY ("contactId") REFERENCES "contact"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "FK_ed20288ea48065bb8160128165b" FOREIGN KEY ("infoPetId") REFERENCES "info_pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "FK_4eb3b1eeefc7cdeae09f934f479" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_4eb3b1eeefc7cdeae09f934f479"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_ed20288ea48065bb8160128165b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6530f8ceb93f81306e5396384e8"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`);
        await queryRunner.query(`DROP TABLE "pet"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "info_pet"`);
        await queryRunner.query(`DROP TABLE "contact"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
