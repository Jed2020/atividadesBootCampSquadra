import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('UF')

export default class State {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 3,
    })
    sigla: string;

    @Column({
        length: 256,
    })
    nome_estado: string;
    
    @Column({
        length: 3,
    })
    status: number;

}