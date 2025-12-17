import {Entity, ManyToOne, JoinColumn, PrimaryColumn, Column} from "typeorm";
import type { Relation } from "typeorm";
import { Tournament } from "./Tournament";
import { Section } from "./Section";
import { Player } from "./Player";

@Entity({ name: "registrations" })
export class Registration {
    @PrimaryColumn({ name: "player_id", type: "int" })
    playerId: number;

    @PrimaryColumn({ name: "tournament_id", type: "int" })
    tournamentId: number;

    @PrimaryColumn({ name: "section_id", type: "int" })
    sectionId: number;

    @Column({name: "created_at", type: "timestamp"})
    createdAt: Date;

    @Column({name: "updated_at", type: "timestamp"})
    updatedAt: Date;

    @ManyToOne(() => Player, { onDelete: "CASCADE" })
    @JoinColumn({ name: "player_id", referencedColumnName: "id" })
    player: Relation<Player>;

    @ManyToOne(() => Tournament, { onDelete: "CASCADE" })
    @JoinColumn({ name: "tournament_id", referencedColumnName: "id" })
    tournament: Relation<Tournament>;

    @ManyToOne(() => Section, { onDelete: "CASCADE" })
    @JoinColumn({ name: "section_id", referencedColumnName: "id" })
    section: Relation<Section>;
}