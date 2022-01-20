import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import District from '../models/districtModel';
import User from '../models/userModel';
import { MaxLength, MinLength } from 'class-validator';
@Entity('Endereco')

export default class Address {
    @PrimaryGeneratedColumn('uuid')
    Endereco_id: string;

    @Column({
        length: 256,
    })
    @MaxLength(256, {
        message: 'Atingiu o Máximo.',
    })
    @MinLength(3, {
        message: 'É muito curto.',
    })
    nome_rua: string;

    @Column({
        length: 10,
    })
    @MaxLength(10, {
        message: 'Atingiu o Máximo.',
    })
    @MinLength(0, {
        message: 'É muito curto.',
    })
    numero: string;

    @Column({
        length: 20,
    })
    @MaxLength(20, {
        message: 'Atingiu o Máximo.',
    })
    @MinLength(0, {
        message: 'É muito curto.',
    })
    complemento: string;

    @Column({
        length: 10,
    })@MaxLength(10, {
        message: 'Atingiu o Máximo.',
    })
    @MinLength(0, {
        message: 'É muito curto.',
    })
    cep: string;

    @Column()
    Bairro_id: string;

    @Column()
    Pessoa_id: string;

    @ManyToOne(type => District, bairro => bairro.Endereco, {eager: true})
    @JoinColumn({name:"Bairro_id"})
    Bairro: District;

    @ManyToOne(type => User, pessoa => pessoa.Endereco)
    @JoinColumn({name:"Pessoa_id"})
    Pessoa: User;

}