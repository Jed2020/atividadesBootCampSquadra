import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationDistrictandCityAlterModel1642597349721 implements MigrationInterface {
    name = 'RelationDistrictandCityAlterModel1642597349721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Bairro" DROP CONSTRAINT "FK_278da6a08c1dc95d635f41b42ef"`);
        await queryRunner.query(`ALTER TABLE "Bairro" DROP COLUMN "municipioMunicipioId"`);
        await queryRunner.query(`ALTER TABLE "Bairro" DROP COLUMN "Municipio_id"`);
        await queryRunner.query(`ALTER TABLE "Bairro" ADD "Municipio_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Bairro" ADD CONSTRAINT "FK_c4290fe5bd3166a73f852676e4b" FOREIGN KEY ("Municipio_id") REFERENCES "Municipio"("Municipio_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Bairro" DROP CONSTRAINT "FK_c4290fe5bd3166a73f852676e4b"`);
        await queryRunner.query(`ALTER TABLE "Bairro" DROP COLUMN "Municipio_id"`);
        await queryRunner.query(`ALTER TABLE "Bairro" ADD "Municipio_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Bairro" ADD "municipioMunicipioId" uuid`);
        await queryRunner.query(`ALTER TABLE "Bairro" ADD CONSTRAINT "FK_278da6a08c1dc95d635f41b42ef" FOREIGN KEY ("municipioMunicipioId") REFERENCES "Municipio"("Municipio_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
