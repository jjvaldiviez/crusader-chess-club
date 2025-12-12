import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    OneToMany,
} from "typeorm";
import { Tournament } from "./Tournament";
import { Player } from "./Player";
import { Game } from "./Game";

@Entity({ name: "sections" })
export class Section {
    @PrimaryGeneratedColumn({ name: "section_id" })
    id: number;

    @Column({ name: "name", length: 100 })
    name: string;

    @ManyToOne(() => Tournament, (t) => t.sections, {
        onDelete: "CASCADE",
    })
    tournament: Tournament;

    @ManyToMany(() => Player, (p) => p.sections)
    @JoinTable({
        name: "section_players",
        joinColumn: { name: "section_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "player_id", referencedColumnName: "id" },
    })
    players: Player[];

    @OneToMany(() => Game, (g) => g.section)
    games: Game[];
}
