import "reflect-metadata";
import { DataSource } from "typeorm";
import { Player } from "./entity/Player";
import {Tournament} from "@/backend/entity/Tournament";
import {Section} from "@/backend/entity/Section";
import {Game} from "@/backend/entity/Game";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "appuser",
    password: "apppass",
    database: "appdb",
    synchronize: true,
    logging: false,
    entities: [Player, Tournament, Section, Game],
    migrations: [],
    subscribers: [],
});
export async function getAppDataSource() {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource;
}