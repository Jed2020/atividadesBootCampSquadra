import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCity1642449157135 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Municipio",
                columns: [
                    {
                     name: 'id',
                     type: 'uuid',
                     isPrimary: true,
                     generationStrategy: 'uuid',
                     default: 'uuid_generate_v4()',
                    },
                    {
                     name: 'nome_cidade',
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
        queryRunner.dropTable('Municipio');
    }
}
