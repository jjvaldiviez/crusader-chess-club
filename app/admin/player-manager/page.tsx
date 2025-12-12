import db from "@/lib/server/db";
import {PlayerSearchCard} from "@/app/components/admin/items/player-search-card";
import Link from "next/link";
import Search from "@/app/components/admin/items/search-bar";
import {AdminPageWrapper} from "@/app/components/admin/admin-page-wrapper";
import {getPlayerDashboardData} from "@/app/helpers/player-dashboard-data";
import {Modal} from "@/app/helpers/modal"
import {PlayerDashboardView} from "@/app/components/player/player-dashboard-view";
import {RegistrationsModule} from "@/app/components/admin/modules/registrations-module";

export default async function PlayerManagerPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page) || 1;
    const query = typeof searchParams.query === 'string' ? searchParams.query : '';
    const viewPlayerId = searchParams.view_player ? Number(searchParams.view_player) : null;
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    // Start building the query
    const baseQuery = db("players");

    // Apply search filter if query exists
    if (query) {
        baseQuery.where((builder) => {
            builder.where("first_name", "like", `%${query}%`)
                .orWhere("last_name", "like", `%${query}%`)
                .orWhere("uscf_id", "like", `%${query}%`);
        });
    }

    // Clone the base query to get the count of filtered items
    const countResult = await baseQuery.clone().count("player_id as count").first();
    const totalPlayers = countResult ? Number(countResult.count) : 0;
    const totalPages = Math.ceil(totalPlayers / pageSize);

    // Get the actual data with pagination
    const allPlayers = await baseQuery
        .select("*")
        .orderBy("player_id", "desc")
        .limit(pageSize)
        .offset(offset);

    // Fetch Modal Data if param exists
    let selectedPlayerData = null;
    if (viewPlayerId) {
        selectedPlayerData = await getPlayerDashboardData(viewPlayerId);
    }

    return (
        <AdminPageWrapper>
            {selectedPlayerData && (
                <Modal>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Player Details</h2>
                    </div>
                    <PlayerDashboardView data={selectedPlayerData} />
                </Modal>
            )}

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