import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import State from '../models/stateModel'
@Entity('Municipio')

export default class City {
    @PrimaryGeneratedColumn('uuid')
    Municipio_id: string;

    @Column({
        length: 256,
    })
    nome_cidade: string;
    
    @Column({
        width: 3,
    })
    status: number;

    @Column()
    UF_id: string;


    @ManyToOne(type => State, uf => uf.Municipio)
    @JoinColumn({name:"UF_id"})
    UF : State;
}