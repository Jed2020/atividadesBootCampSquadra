import {MigrationInterface, QueryRunner} from "typeorm";

export class AddressAlterModel1642708986786 implements MigrationInterface {
    name = 'AddressAlterModel1642708986786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Endereco" DROP CONSTRAINT "FK_128ff1c1adcb16109b613f3fff8"`);
        await queryRunner.query(`ALTER TABLE "Endereco" DROP CONSTRAINT "FK_25bc171150647ab21add646446a"`);
        await queryRunner.query(`ALTER TABLE "Endereco" ALTER COLUMN "Bairro_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Endereco" ALTER COLUMN "Pessoa_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Endereco" ADD CONSTRAINT "FK_128ff1c1adcb16109b613f3fff8" FOREIGN KEY ("Bairro_id") REFERENCES "Bairro"("Bairro_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Endereco" ADD CONSTRAINT "FK_25bc171150647ab21add646446a" FOREIGN KEY ("Pessoa_id") REFERENCES "Pessoa"("Pessoa_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Endereco" DROP CONSTRAINT "FK_25bc171150647ab21add646446a"`);
        await queryRunner.query(`ALTER TABLE "Endereco" DROP CONSTRAINT "FK_128ff1c1adcb16109b613f3fff8"`);
        await queryRunner.query(`ALTER TABLE "Endereco" ALTER COLUMN "Pessoa_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Endereco" ALTER COLUMN "Bairro_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Endereco" ADD CONSTRAINT "FK_25bc171150647ab21add646446a" FOREIGN KEY ("Pessoa_id") REFERENCES "Pessoa"("Pessoa_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Endereco" ADD CONSTRAINT "FK_128ff1c1adcb16109b613f3fff8" FOREIGN KEY ("Bairro_id") REFERENCES "Bairro"("Bairro_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
