// player.queries.ts
import { Repository, SelectQueryBuilder, Brackets } from "typeorm";
import { Player } from "@/backend/entity/Player";

export type PlayerListFilters = {
    query?: string;
};

export function buildPlayerListQb(
    repo: Repository<Player>,
    filters: PlayerListFilters
): SelectQueryBuilder<Player> {
    const qb = repo.createQueryBuilder("p");

    if (filters.query) {
        qb.andWhere(
            new Brackets((q) => {
                q.where("p.first_name LIKE :q", { q: `%${filters.query}%` })
                    .orWhere("p.last_name LIKE :q", { q: `%${filters.query}%` })
                    .orWhere("p.uscf_id LIKE :q", { q: `%${filters.query}%` });
            })
        );
    }

    return qb;
}