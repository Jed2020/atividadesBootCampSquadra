import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import State from '../models/stateModel';
import District from '../models/districtModel';
import { MaxLength, MinLength, IsNotEmpty } from 'class-validator';

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
    @IsNotEmpty({
        message: 'Campo precisa ser preenchido.',
    })
    nome: string;
    
    @Column({
        width: 3,
    })
    
    status: number;

    @Column()
    @IsNotEmpty({
        message: 'Campo precisa ser preenchido.',
    })
    codigoUF: string;

    @ManyToOne(type => State, uf => uf.Municipio)
    @JoinColumn({name:"codigoUF"})
    UF : State;

    @OneToMany(type => District, bairro => bairro.Municipio)
    Bairro : District[];
}