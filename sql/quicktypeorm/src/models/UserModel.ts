import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import Address from '../models/addressModel';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

const bcrypt = require('bcrypt');

@Entity('Pessoa')

export default class User {
    @PrimaryGeneratedColumn('uuid')
    codigoPessoa: string;

    @Column({
        length: 256,
        transformer: {
            from: (value: string) => value.toLowerCase(),
            to: (value: string) => value.toUpperCase(),
        },
    })
    @MaxLength(256, {
        message: 'Atingiu o Máximo.',
    })
    @MinLength(3, {
        message: 'É muito curto.',
    })
    nome: string;

    @Column({
        length: 256,
        transformer: {
            from: (value: string) => value.toLowerCase(),
            to: (value: string) => value.toUpperCase(),
        },
    })
    @MaxLength(256, {
        message: 'Atingiu o Máximo.',
    })
    @MinLength(3, {
        message: 'É muito curto.',
    })
    sobrenome: string;

    @Column({
        width: 3,
    })
    idade: number;

    @Column({
        length: 50,
    })
    @IsEmail({
        message: 'Email inválido.',
    })
    login: string;

    @Column({
        length: 256,
    })
    @IsString()
    @MaxLength(50, {
        message: 'Atingiu o Máximo.',
    })
    @MinLength(3, {
        message: 'É muito curto.',
    })
    senha: string;

    @Column({
        width: 9,
    })
    status: number;

    @OneToMany(type => Address, endereco => endereco.Pessoa, {eager: true})
    Endereco : Address[];

    @BeforeInsert() async hashPassword() {
        this.senha = await bcrypt.hash(this.senha, 3);  
    }         
    
    @BeforeUpdate() async hashUpPassword() {
        this.senha = await bcrypt.hash(this.senha, 3);  
    }
}