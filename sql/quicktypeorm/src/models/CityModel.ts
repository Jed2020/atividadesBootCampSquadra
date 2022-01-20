import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import State from '../models/stateModel';
import District from '../models/districtModel';
import { MaxLength, MinLength } from 'class-validator';

@Entity('Municipio')

export default class City {
    @PrimaryGeneratedColumn('uuid')
    Municipio_id: string;

    @Column({
        length: 256,
    })
    @MaxLength(256, {
        message: 'Atingiu o Máximo.',
    })
    @MinLength(3, {
        message: 'É muito curto.',
    })
    nome_cidade: string;
    
    @Column({
        width: 3,
    })
    status: number;

    @Column()
    UF_id: string;

    @ManyToOne(type => State, uf => uf.Municipio, {eager: true})
    @JoinColumn({name:"UF_id"})
    UF : State;

    @OneToMany(type => District, bairro => bairro.Municipio)
    Bairro : District;
}