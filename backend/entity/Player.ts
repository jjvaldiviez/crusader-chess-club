import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    OneToMany,
} from "typeorm";
import { Section } from "./Section";
import { Game } from "./Game";

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

    @ManyToMany(() => Section, (s) => s.players)
    sections: Section[];

    @OneToMany(() => Game, (g) => g.whitePlayer)
    gamesAsWhite: Game[];

    @OneToMany(() => Game, (g) => g.blackPlayer)
    gamesAsBlack: Game[];
}
