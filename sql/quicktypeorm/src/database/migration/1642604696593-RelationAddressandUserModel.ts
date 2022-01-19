import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationAddressandUserModel1642604696593 implements MigrationInterface {
    name = 'RelationAddressandUserModel1642604696593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Pessoa" RENAME COLUMN "id" TO "Pessoa_id"`);
        await queryRunner.query(`ALTER TABLE "Pessoa" RENAME CONSTRAINT "PK_f385f5f76d9ee25e52e522bd3b4" TO "PK_002c9968d2afa77967d6fe20ca9"`);
        await queryRunner.query(`ALTER TABLE "Endereco" DROP CONSTRAINT "PK_2a46cde15eb6d29d5562fc169d8"`);
        await queryRunner.query(`ALTER TABLE "Endereco" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Endereco" ADD "Endereco_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "Endereco" ADD CONSTRAINT "PK_4222ecfab1d013bb910901cef8b" PRIMARY KEY ("Endereco_id")`);
        await queryRunner.query(`ALTER TABLE "Endereco" ADD "User_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Endereco" DROP COLUMN "User_id"`);
        await queryRunner.query(`ALTER TABLE "Endereco" DROP CONSTRAINT "PK_4222ecfab1d013bb910901cef8b"`);
        await queryRunner.query(`ALTER TABLE "Endereco" DROP COLUMN "Endereco_id"`);
        await queryRunner.query(`ALTER TABLE "Endereco" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "Endereco" ADD CONSTRAINT "PK_2a46cde15eb6d29d5562fc169d8" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "Pessoa" RENAME CONSTRAINT "PK_002c9968d2afa77967d6fe20ca9" TO "PK_f385f5f76d9ee25e52e522bd3b4"`);
        await queryRunner.query(`ALTER TABLE "Pessoa" RENAME COLUMN "Pessoa_id" TO "id"`);
    }

}
