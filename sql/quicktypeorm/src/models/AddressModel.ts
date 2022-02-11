import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import District from '../models/districtModel';
import User from '../models/userModel';
import { MaxLength, MinLength, IsNotEmpty } from 'class-validator';
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
    @IsNotEmpty({
        message: 'Campo precisa ser preenchido.',
    })
    nomeRua: string;

    @Column({
        length: 10,
    })
    @MaxLength(10, {
        message: 'Atingiu o Máximo.',
    })
    @MinLength(0, {
        message: 'É muito curto.',
    })
    @IsNotEmpty({
        message: 'Campo precisa ser preenchido.',
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
    @IsNotEmpty({
        message: 'Campo precisa ser preenchido.',
    })
    cep: string;

    @Column()
    @IsNotEmpty({
        message: 'Campo precisa ser preenchido.',
    })
    codigoBairro: string;

    @Column()
    @IsNotEmpty({
        message: 'Campo precisa ser preenchido.',
    })
    codigoPessoa: string;

    @ManyToOne(type => District, bairro => bairro.Endereco)
    @JoinColumn({name:"codigoBairro"})
    Bairro: District;

    @ManyToOne(type => User, pessoa => pessoa.Endereco)
    @JoinColumn({name:"codigoPessoa"})
    Pessoa: User;

}