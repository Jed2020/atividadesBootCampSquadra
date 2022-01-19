import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationDistrictandCityAlterModel1642597036583 implements MigrationInterface {
    name = 'RelationDistrictandCityAlterModel1642597036583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Municipio" DROP COLUMN "Bairro_id"`);
        await queryRunner.query(`ALTER TABLE "Bairro" ADD "Municipio_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Bairro" DROP COLUMN "Municipio_id"`);
        await queryRunner.query(`ALTER TABLE "Municipio" ADD "Bairro_id" character varying NOT NULL`);
    }

}
