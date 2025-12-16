import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    OneToMany,
    type Relation,
} from "typeorm";
import type { Section } from "./Section";
import type { Game } from "./Game";

@Entity({ name: "players" })
export class Player {
    @PrimaryGeneratedColumn({ name: "player_id" })
    id: number;

    @Column({ name: "first_name", length: 50 })
    firstName: string;

    @Column({ name: "last_name", length: 50 })
    lastName: string;

    @Column({ name: "age", type: "int" })
    age: number;

    @Column({ name: "uscf_id", length: 20, unique: true })
    uscfId: string;

    @Column({ name: "uscf_expiration", type: "date", nullable: true })
    uscfExpiration: string | null;

    @ManyToMany("Section", "players")
    sections: Relation<Section[]>;

    @OneToMany("Game", "whitePlayer")
    gamesAsWhite: Relation<Game[]>;

    @OneToMany("Game", "blackPlayer")
    gamesAsBlack: Relation<Game[]>;
}