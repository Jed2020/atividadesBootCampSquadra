import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationCityandStateAlterModel1642594453200 implements MigrationInterface {
    name = 'RelationCityandStateAlterModel1642594453200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Municipio" DROP CONSTRAINT "FK_0bd96455f37668565818e0c8fa5"`);
        await queryRunner.query(`ALTER TABLE "UF" RENAME COLUMN "id" TO "UF_id"`);
        await queryRunner.query(`ALTER TABLE "UF" RENAME CONSTRAINT "PK_41a2465b411f0150a192846a001" TO "PK_2e3d7406d83a627b68b4702dba0"`);
        await queryRunner.query(`ALTER TABLE "Municipio" DROP CONSTRAINT "PK_0bd96455f37668565818e0c8fa5"`);
        await queryRunner.query(`ALTER TABLE "Municipio" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Municipio" ADD "Municipio_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "Municipio" ADD CONSTRAINT "PK_0addf2113ae170c961ddab77fd1" PRIMARY KEY ("Municipio_id")`);
        await queryRunner.query(`ALTER TABLE "Municipio" ADD "UF_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Municipio" ADD CONSTRAINT "FK_603d2aa194a1affefc9afb573d8" FOREIGN KEY ("UF_id") REFERENCES "UF"("UF_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Municipio" DROP CONSTRAINT "FK_603d2aa194a1affefc9afb573d8"`);
        await queryRunner.query(`ALTER TABLE "Municipio" DROP COLUMN "UF_id"`);
        await queryRunner.query(`ALTER TABLE "Municipio" DROP CONSTRAINT "PK_0addf2113ae170c961ddab77fd1"`);
        await queryRunner.query(`ALTER TABLE "Municipio" DROP COLUMN "Municipio_id"`);
        await queryRunner.query(`ALTER TABLE "Municipio" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "Municipio" ADD CONSTRAINT "PK_0bd96455f37668565818e0c8fa5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "UF" RENAME CONSTRAINT "PK_2e3d7406d83a627b68b4702dba0" TO "PK_41a2465b411f0150a192846a001"`);
        await queryRunner.query(`ALTER TABLE "UF" RENAME COLUMN "UF_id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "Municipio" ADD CONSTRAINT "FK_0bd96455f37668565818e0c8fa5" FOREIGN KEY ("id") REFERENCES "UF"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
