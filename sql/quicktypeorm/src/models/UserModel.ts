import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Address from '../models/addressModel';
import { IsEmail, IsString, Max, MaxLength, min, Min, MinLength } from 'class-validator';

@Entity('Pessoa')

export default class User {
    @PrimaryGeneratedColumn('uuid')
    Pessoa_id: string;

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
        length: 256,
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
        length: 50,
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
    Endereco : Address;
}