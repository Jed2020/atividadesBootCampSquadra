import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne, Column, OneToMany } from "typeorm";
import City from '../models/cityModel';
import Address from '../models/addressModel';

@Entity('Bairro')

export default class District {
    @PrimaryGeneratedColumn('uuid')
    Bairro_id: string;

    @Column({
        length: 256,
    })
    nome_bairro: string;
    
    @Column({
        width: 3,
    })
    status: number;

    @Column()
    Municipio_id: string;

    @ManyToOne(type => City, municipio => municipio.Bairro)
    @JoinColumn({name:"Municipio_id"})
    Municipio: City;

    @OneToMany(type => Address, endereco => endereco.Bairro)
    Endereco : Address;

}