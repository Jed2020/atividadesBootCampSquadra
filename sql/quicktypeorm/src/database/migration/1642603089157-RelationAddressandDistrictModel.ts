import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationAddressandDistrictModel1642603089157 implements MigrationInterface {
    name = 'RelationAddressandDistrictModel1642603089157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Endereco" DROP CONSTRAINT "FK_128ff1c1adcb16109b613f3fff8"`);
        await queryRunner.query(`ALTER TABLE "Endereco" DROP CONSTRAINT "UQ_128ff1c1adcb16109b613f3fff8"`);
        await queryRunner.query(`ALTER TABLE "Endereco" ADD CONSTRAINT "FK_128ff1c1adcb16109b613f3fff8" FOREIGN KEY ("Bairro_id") REFERENCES "Bairro"("Bairro_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Endereco" DROP CONSTRAINT "FK_128ff1c1adcb16109b613f3fff8"`);
        await queryRunner.query(`ALTER TABLE "Endereco" ADD CONSTRAINT "UQ_128ff1c1adcb16109b613f3fff8" UNIQUE ("Bairro_id")`);
        await queryRunner.query(`ALTER TABLE "Endereco" ADD CONSTRAINT "FK_128ff1c1adcb16109b613f3fff8" FOREIGN KEY ("Bairro_id") REFERENCES "Bairro"("Bairro_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
