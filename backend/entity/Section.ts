import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    OneToMany,
    type Relation,
} from "typeorm";
import type { Tournament } from "./Tournament";
import type { Player } from "./Player";
import type { Game } from "./Game";

@Entity({ name: "sections" })
export class Section {
    @PrimaryGeneratedColumn({ name: "section_id" })
    id: number;

    @Column({ name: "name", length: 100 })
    name: string;

    @ManyToOne("Tournament", "sections", {
        onDelete: "CASCADE",
    })
    tournament: Relation<Tournament>;

    @ManyToMany("Player", "sections")
    @JoinTable({
        name: "section_players",
        joinColumn: { name: "section_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "player_id", referencedColumnName: "id" },
    })
    players: Relation<Player[]>;

    @OneToMany("Game", "section")
    games: Relation<Game[]>;
}