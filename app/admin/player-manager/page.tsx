import db from "@/lib/server/db";
import {PlayerSearchCard} from "@/app/components/admin/items/player-search-card";
import Link from "next/link";
import Search from "@/app/components/admin/items/search-bar";
import {AdminPageWrapper} from "@/app/components/admin/admin-page-wrapper";
import {getPlayerDashboardData} from "@/app/helpers/player-dashboard-data";
import {Modal} from "@/app/helpers/modal"
import {PlayerDashboardView} from "@/app/components/player/player-dashboard-view";
import {RegistrationsModule} from "@/app/components/admin/modules/registrations-module";
import {AppDataSource, getAppDataSource} from "@/backend/data-source";
import {Player} from "@/backend/entity/Player";

export default async function PlayerManagerPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page) || 1;
    const query = typeof searchParams.query === 'string' ? searchParams.query : '';
    const viewPlayerId = searchParams.view_player ? Number(searchParams.view_player) : null;
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    const ds = await getAppDataSource();
    const qb = AppDataSource.getRepository(Player).createQueryBuilder("p");

    // Apply search filter if query exists
    if (query) {
        qb.andWhere("p.first_name like :query or p.last_name like :query or p.uscf_id like :query", {query: `%${query}%`});
    }

    // Clone the base query to get the count of filtered items

    const totalPlayers = await qb.getCount();
    const totalPages = Math.ceil(totalPlayers / pageSize);

    // Get the actual data with pagination
    const allPlayers = await qb
        .orderBy("p.last_name", "ASC")
        .skip(offset)
        .take(pageSize)
        .getMany();

    // Fetch Modal Data if param exists
    let selectedPlayerData = null;
    if (viewPlayerId) {
        selectedPlayerData = await getPlayerDashboardData(viewPlayerId);
    }

    return (
        <AdminPageWrapper>
            <div className="space-y-6">
                <header>
                    <h1 className="text-2xl font-bold tracking-tight">Player Dashboard</h1>
                    <p className="text-muted-foreground">Players that signed up with Crusaders Chess.</p>
                </header>
                {/* Recent Registrations Card */}
                <RegistrationsModule players={allPlayers} page={page} totalPages={totalPages} query={query}/>
            </div>
        </AdminPageWrapper>
    );
}