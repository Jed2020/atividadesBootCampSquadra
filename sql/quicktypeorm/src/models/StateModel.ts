import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, OneToMany } from "typeorm";
import City from '../models/cityModel';
import { MaxLength, MinLength, IsNotEmpty } from 'class-validator';

@Entity('UF')

export default class State {
    @PrimaryGeneratedColumn('uuid')
    codigoUF: string;

    @Column({
        length: 3,
    })
    @MaxLength(3, {
        message: 'Atingiu o Máximo.',
    })
    @MinLength(2, {
        message: 'É muito curto.',
    })
    @IsNotEmpty({
        message: 'Campo precisa ser preenchido.',
    })
    sigla: string;

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
        width: 3,
    })
    @IsNotEmpty({
        message: 'Campo precisa ser preenchido.',
    })
    status: number;

    @OneToMany(type => City, municipio => municipio.UF)
    Municipio: City[];

}