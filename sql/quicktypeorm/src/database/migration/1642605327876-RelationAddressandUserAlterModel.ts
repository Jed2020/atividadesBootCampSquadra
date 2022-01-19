import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationAddressandUserAlterModel1642605327876 implements MigrationInterface {
    name = 'RelationAddressandUserAlterModel1642605327876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Endereco" DROP COLUMN "User_id"`);
        await queryRunner.query(`ALTER TABLE "Endereco" DROP CONSTRAINT "FK_25bc171150647ab21add646446a"`);
        await queryRunner.query(`ALTER TABLE "Endereco" ALTER COLUMN "Pessoa_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Endereco" ADD CONSTRAINT "FK_25bc171150647ab21add646446a" FOREIGN KEY ("Pessoa_id") REFERENCES "Pessoa"("Pessoa_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Endereco" DROP CONSTRAINT "FK_25bc171150647ab21add646446a"`);
        await queryRunner.query(`ALTER TABLE "Endereco" ALTER COLUMN "Pessoa_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Endereco" ADD CONSTRAINT "FK_25bc171150647ab21add646446a" FOREIGN KEY ("Pessoa_id") REFERENCES "Pessoa"("Pessoa_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Endereco" ADD "User_id" character varying NOT NULL`);
    }

}
