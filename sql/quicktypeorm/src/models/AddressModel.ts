import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Endereco')

export default class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 256,
    })
    nome_rua: string;

    @Column({
        length: 10,
    })
    numero: string;

    @Column({
        length: 20,
    })
    complemento: string;

    @Column({
        length: 10,
    })
    cep: string;

}