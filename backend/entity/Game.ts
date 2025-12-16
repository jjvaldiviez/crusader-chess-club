import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    type Relation,
} from "typeorm";
import type { Section } from "./Section";
import type { Player } from "./Player";

export type GameResult = "1-0" | "0-1" | "0.5-0.5";

@Entity({ name: "games" })
export class Game {
    @PrimaryGeneratedColumn({ name: "game_id" })
    id: number;

    @ManyToOne("Section", "games", {
        onDelete: "CASCADE",
    })
    section: Relation<Section>;

    @Column({ name: "round_number" })
    roundNumber: number;

    @ManyToOne("Player", "gamesAsWhite", {
        onDelete: "CASCADE",
    })
    whitePlayer: Relation<Player>;

    @ManyToOne("Player", "gamesAsBlack", {
        onDelete: "CASCADE",
    })
    blackPlayer: Relation<Player>;

    @Column({
        type: "enum",
        enum: ["1-0", "0-1", "0.5-0.5"],
    })
    result: GameResult;
}