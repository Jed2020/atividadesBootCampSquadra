import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne, ManyToMany } from "typeorm";
import District from '../models/districtModel';
import User from '../models/userModel';
@Entity('Endereco')

export default class Address {
    @PrimaryGeneratedColumn('uuid')
    Endereco_id: string;

    @Column({
        length: 256,
    })
    nome_rua: string;

    @Column({
        length: 10,
    })
    numero: string;

    @Column({
        length: 20,
    })
    complemento: string;

    @Column({
        length: 10,
    })
    cep: string;

    @Column()
    Bairro_id: string;

    @Column()
    Pessoa_id: string;

    @ManyToOne(type => District, bairro => bairro.Endereco, {eager: true})
    @JoinColumn({name:"Bairro_id"})
    Bairro: District;

    @ManyToOne(type => User, pessoa => pessoa.Endereco)
    @JoinColumn({name:"Pessoa_id"})
    Pessoa: User;

}