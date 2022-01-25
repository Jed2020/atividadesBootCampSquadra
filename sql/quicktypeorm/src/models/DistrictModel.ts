import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne, Column, OneToMany } from "typeorm";
import City from '../models/cityModel';
import Address from '../models/addressModel';
import { MaxLength, MinLength } from 'class-validator';

@Entity('Bairro')

export default class District {
    @PrimaryGeneratedColumn('uuid')
    codigoBairro: string;

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
    codigoMunicipio: string;

    @ManyToOne(type => City, municipio => municipio.Bairro, {eager: true})
    @JoinColumn({name:"codigoMunicipio"})
    Municipio: City;

    @OneToMany(type => Address, endereco => endereco.Bairro)
    Endereco : Address[];

}