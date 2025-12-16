import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    type Relation,
} from "typeorm";
import type { Section } from "./Section";

@Entity({ name: "tournaments" })
export class Tournament {
    @PrimaryGeneratedColumn({ name: "tournament_id" })
    id: number;

    @Column({ name: "name", length: 100 })
    name: string;

    @Column({ name: "location", length: 100 })
    location: string;

    @Column({ name: "description", type: "text", nullable: true })
    description: string | null;

    @Column({ name: "start_date", type: "date" })
    startDate: string;

    @Column({ name: "end_date", type: "date" })
    endDate: string;

    @OneToMany("Section", "tournament")
    sections: Relation<Section[]>;
}