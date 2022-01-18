import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Municipio')

export default class City {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 256,
    })
    nome_cidade: string;
    
    @Column({
        width: 3,
    })
    status: number;

}