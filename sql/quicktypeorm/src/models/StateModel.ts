import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, OneToMany } from "typeorm";
import City from '../models/cityModel';

@Entity('UF')

export default class State {
    @PrimaryGeneratedColumn('uuid')
    UF_id: string;

    @Column({
        length: 3,
    })
    sigla: string;

    @Column({
        length: 256,
    })
    nome_estado: string;
    
    @Column({
        width: 3,
    })
    status: number;

    @OneToMany(type => City, municipio => municipio.UF)
    Municipio: City;

}