import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import District from '../models/districtModel';
import User from '../models/userModel';
import { MaxLength, MinLength } from 'class-validator';
@Entity('Endereco')

export default class Address {
    @PrimaryGeneratedColumn('uuid')
    codigoEndereco: string;

    @Column({
        length: 256,
    })
    @MaxLength(256, {
        message: 'Atingiu o Máximo.',
    })
    @MinLength(3, {
        message: 'É muito curto.',
    })
    nome: string;

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
    codigoBairro: string;

    @Column()
    codigoPessoa: string;

    @ManyToOne(type => District, bairro => bairro.Endereco, {eager: true})
    @JoinColumn({name:"codigoBairro"})
    Bairro: District;

    @ManyToOne(type => User, pessoa => pessoa.Endereco)
    @JoinColumn({name:"codigoPessoa"})
    Pessoa: User;

}