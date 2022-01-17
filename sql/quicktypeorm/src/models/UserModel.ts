import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Pessoa')

export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 256,
    })
    nome: string;

    @Column({
        length: 256,
    })
    sobrenome: string;

    @Column({
        length: 3,
    })
    idade: number;

    @Column({
        length: 50,
    })
    login: string;

    @Column({
        length: 50,
    })
    senha: string;

    @Column({
        length: 9,
    })
    status: number;

}