import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Bairro')

export default class District {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 256,
    })
    nome_bairro: string;
    
    @Column({
        length: 3,
    })
    status: number;

}