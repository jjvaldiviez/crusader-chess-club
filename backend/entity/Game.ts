import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from "typeorm";
import { Section } from "./Section";
import { Player } from "./Player";

export type GameResult = "1-0" | "0-1" | "0.5-0.5";

@Entity({ name: "games" })
export class Game {
    @PrimaryGeneratedColumn({ name: "game_id" })
    id: number;

    @ManyToOne(() => Section, (s) => s.games, {
        onDelete: "CASCADE",
    })
    section: Section;

    @Column({ name: "round_number" })
    roundNumber: number;

    @ManyToOne(() => Player, (p) => p.gamesAsWhite, {
        onDelete: "CASCADE",
    })
    whitePlayer: Player;

    @ManyToOne(() => Player, (p) => p.gamesAsBlack, {
        onDelete: "CASCADE",
    })
    blackPlayer: Player;

    @Column({
        type: "enum",
        enum: ["1-0", "0-1", "0.5-0.5"],
    })
    result: GameResult;
}
