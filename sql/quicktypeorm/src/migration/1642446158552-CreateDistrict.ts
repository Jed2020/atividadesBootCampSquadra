import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateDistrict1642446158552 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Bairro",
                columns: [
                    {
                     name: 'id',
                     type: 'uuid',
                     isPrimary: true,
                     generationStrategy: 'uuid',
                     default: 'uuid_generate_v4()',
                    },
                    {
                     name: 'nome_bairro',
                     type: 'varchar',
                    },
                    {
                     name: 'status',
                     type: 'numeric',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('Bairro');
    }

}
