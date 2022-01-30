import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import Address from '../models/addressModel';
import { IsEmail, IsString, MaxLength, MinLength, IsNotEmpty } from 'class-validator';

const bcrypt = require('bcrypt');

@Entity('Pessoa')

export default class User {
    @PrimaryGeneratedColumn('uuid')
    codigoPessoa: string;

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
    nome: string;

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
    sobrenome: string;

    @Column({
        width: 3,
    })
    @IsNotEmpty({
        message: 'Campo precisa ser preenchido.',
    })
    idade: number;

    @Column({
        length: 50,
    })
    @IsEmail({
        message: 'Email inválido.',
    })
    @IsNotEmpty({
        message: 'Campo precisa ser preenchido.',
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
    @IsNotEmpty({
        message: 'Campo precisa ser preenchido.',
    })
    senha: string;

    @Column({
        width: 9,
    })
    @IsNotEmpty({
        message: 'Campo precisa ser preenchido.',
    })
    status: number;

    @OneToMany(type => Address, endereco => endereco.Pessoa)
    Endereco : Address[];

    @BeforeInsert() async hashPassword() {
        this.senha = await bcrypt.hash(this.senha, 3);  
    }         
    
    @BeforeUpdate() async hashUpPassword() {
        this.senha = await bcrypt.hash(this.senha, 3);  
    }
}