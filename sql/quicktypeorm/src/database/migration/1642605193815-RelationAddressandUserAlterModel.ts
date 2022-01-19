import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationAddressandUserAlterModel1642605193815 implements MigrationInterface {
    name = 'RelationAddressandUserAlterModel1642605193815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Endereco" ADD "Pessoa_id" uuid`);
        await queryRunner.query(`ALTER TABLE "Endereco" ADD CONSTRAINT "FK_25bc171150647ab21add646446a" FOREIGN KEY ("Pessoa_id") REFERENCES "Pessoa"("Pessoa_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Endereco" DROP CONSTRAINT "FK_25bc171150647ab21add646446a"`);
        await queryRunner.query(`ALTER TABLE "Endereco" DROP COLUMN "Pessoa_id"`);
    }

}
