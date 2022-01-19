import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationDistrictandCityModel1642595758006 implements MigrationInterface {
    name = 'RelationDistrictandCityModel1642595758006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Bairro" RENAME COLUMN "id" TO "Bairro_id"`);
        await queryRunner.query(`ALTER TABLE "Bairro" RENAME CONSTRAINT "PK_50393d6983dec7acc2bd4a3b0e5" TO "PK_8e00321ad119e878002e094606a"`);
        await queryRunner.query(`ALTER TABLE "Municipio" ADD "Bairro_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Municipio" DROP COLUMN "Bairro_id"`);
        await queryRunner.query(`ALTER TABLE "Bairro" RENAME CONSTRAINT "PK_8e00321ad119e878002e094606a" TO "PK_50393d6983dec7acc2bd4a3b0e5"`);
        await queryRunner.query(`ALTER TABLE "Bairro" RENAME COLUMN "Bairro_id" TO "id"`);
    }

}
