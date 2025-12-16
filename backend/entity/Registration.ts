import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    type Relation,
} from "typeorm";
import type { Tournament } from "./Tournament";
import type { Section } from "./Section";

@Entity({ name: "registrations" })
export class Registration {
    @PrimaryGeneratedColumn({ name: "player_id" })
    id: number;

    @ManyToOne("Tournament", "registrations", {
        onDelete: "CASCADE",
    })
    tournament: Relation<Tournament>;

    @ManyToOne("Section", "registrations", {
        onDelete: "CASCADE",
    })
    section: Relation<Section>;
}