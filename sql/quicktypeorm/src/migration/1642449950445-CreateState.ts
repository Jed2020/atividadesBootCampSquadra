import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateState1642449950445 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "UF",
                columns: [
                    {
                     name: 'id',
                     type: 'uuid',
                     isPrimary: true,
                     generationStrategy: 'uuid',
                     default: 'uuid_generate_v4()',
                    },
                    {
                     name: 'sigla',
                     type: 'varchar',
                    },
                    {
                     name: 'nome_estado',
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
        queryRunner.dropTable('UF');
    }
}
