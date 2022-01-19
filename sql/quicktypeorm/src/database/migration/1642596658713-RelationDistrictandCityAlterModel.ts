import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationDistrictandCityAlterModel1642596658713 implements MigrationInterface {
    name = 'RelationDistrictandCityAlterModel1642596658713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Bairro" ADD "municipioMunicipioId" uuid`);
        await queryRunner.query(`ALTER TABLE "Bairro" ADD CONSTRAINT "FK_278da6a08c1dc95d635f41b42ef" FOREIGN KEY ("municipioMunicipioId") REFERENCES "Municipio"("Municipio_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Bairro" DROP CONSTRAINT "FK_278da6a08c1dc95d635f41b42ef"`);
        await queryRunner.query(`ALTER TABLE "Bairro" DROP COLUMN "municipioMunicipioId"`);
    }

}
