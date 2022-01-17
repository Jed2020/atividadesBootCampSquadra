import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUser1642448455633 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Pessoa",
                columns: [
                    {
                     name: 'id',
                     type: 'uuid',
                     isPrimary: true,
                     generationStrategy: 'uuid',
                     default: 'uuid_generate_v4()',
                    },
                    {
                     name: 'nome',
                     type: 'varchar',
                    },
                    {
                     name: 'sobrenome',
                     type: 'varchar',
                    },
                    {
                     name: 'idade',
                     type: 'numeric',
                    },
                    {
                     name: 'login',
                     type: 'varchar',
                    },
                    {
                     name: 'senha',
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
        queryRunner.dropTable('Pessoa');
    }
}
