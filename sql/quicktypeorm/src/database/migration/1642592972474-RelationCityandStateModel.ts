import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationCityandStateModel1642592972474 implements MigrationInterface {
    name = 'RelationCityandStateModel1642592972474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UF" DROP CONSTRAINT "FK_4ac41c74f72729226aef97e4f9f"`);
        await queryRunner.query(`ALTER TABLE "UF" DROP CONSTRAINT "UQ_4ac41c74f72729226aef97e4f9f"`);
        await queryRunner.query(`ALTER TABLE "UF" DROP COLUMN "municipioId"`);
        await queryRunner.query(`ALTER TABLE "Municipio" ADD CONSTRAINT "FK_0bd96455f37668565818e0c8fa5" FOREIGN KEY ("id") REFERENCES "UF"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Municipio" DROP CONSTRAINT "FK_0bd96455f37668565818e0c8fa5"`);
        await queryRunner.query(`ALTER TABLE "UF" ADD "municipioId" uuid`);
        await queryRunner.query(`ALTER TABLE "UF" ADD CONSTRAINT "UQ_4ac41c74f72729226aef97e4f9f" UNIQUE ("municipioId")`);
        await queryRunner.query(`ALTER TABLE "UF" ADD CONSTRAINT "FK_4ac41c74f72729226aef97e4f9f" FOREIGN KEY ("municipioId") REFERENCES "Municipio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
