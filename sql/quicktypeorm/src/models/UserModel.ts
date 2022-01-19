import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Address from '../models/addressModel';

@Entity('Pessoa')

export default class User {
    @PrimaryGeneratedColumn('uuid')
    Pessoa_id: string;

    @Column({
        length: 256,
    })
    nome: string;

    @Column({
        length: 256,
    })
    sobrenome: string;

    @Column({
        width: 3,
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
        width: 9,
    })
    status: number;

    @OneToMany(type => Address, endereco => endereco.Pessoa, {eager: true})
    Endereco : Address;
}