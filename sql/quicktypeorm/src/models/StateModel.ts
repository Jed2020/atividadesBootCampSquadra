import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, OneToMany } from "typeorm";
import City from '../models/cityModel';
import { MaxLength, MinLength } from 'class-validator';

@Entity('UF')

export default class State {
    @PrimaryGeneratedColumn('uuid')
    codigoUF: string;

    @Column({
        length: 3,
        transformer: {
            from: (value: string) => value.toLowerCase(),
            to: (value: string) => value.toUpperCase(),
        },
    })
    @MaxLength(3, {
        message: 'Atingiu o Máximo.',
    })
    @MinLength(2, {
        message: 'É muito curto.',
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
    nome: string;
    
    @Column({
        width: 3,
    })
    status: number;

    @OneToMany(type => City, municipio => municipio.UF)
    Municipio: City[];

}