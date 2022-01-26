import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import State from '../models/stateModel';
import District from '../models/districtModel';
import { MaxLength, MinLength } from 'class-validator';

@Entity('Municipio')

export default class City {
    @PrimaryGeneratedColumn('uuid')
    codigoMunicipio: string;

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

    @Column()
    codigoUF: string;

    @ManyToOne(type => State, uf => uf.Municipio)
    @JoinColumn({name:"codigoUF"})
    UF : State;

    @OneToMany(type => District, bairro => bairro.Municipio)
    Bairro : District[];
}