import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class SectionPlayer {
    @Column
    section_id: number;

    @Column()
    player_id: number;
}
