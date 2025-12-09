import db from "@/lib/server/db";
import {PlayerSearchCard} from "@/app/components/admin/items/player-search-card";
import Link from "next/link";
import Search from "@/app/components/admin/items/search-bar";
import {AdminPageWrapper} from "@/app/components/admin/admin-page-wrapper";
import {getPlayerDashboardData} from "@/app/helpers/player-dashboard-data";
import {Modal} from "@/app/helpers/modal"
import {PlayerDashboardView} from "@/app/components/player/player-dashboard-view";

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
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-4">
                        <h3 className="text-lg font-semibold leading-none tracking-tight">
                            Registrations
                        </h3>
                        <div className="w-full md:w-1/3">
                            <Search placeholder="Search players..." />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {allPlayers.length === 0 ? (
                            <p className="text-sm text-gray-500">No players found.</p>
                        ) : (
                            <>
                                <ul className="divide-y">
                                    {allPlayers.map((player) => (
                                        <li key={player.player_id} className="py-2 flex justify-between items-center">
                                            <PlayerSearchCard player={player} />
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex items-center justify-between border-t pt-4 mt-4">
                                    <div className="text-sm text-muted-foreground">
                                        Page {page} of {totalPages === 0 ? 1 : totalPages}
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`?query=${query}&page=${page - 1}`}
                                            className={`px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-100 ${
                                                page <= 1 ? "pointer-events-none opacity-50" : ""
                                            }`}
                                            aria-disabled={page <= 1}
                                        >
                                            Previous
                                        </Link>
                                        <Link
                                            href={`?query=${query}&page=${page + 1}`}
                                            className={`px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-100 ${
                                                page >= totalPages ? "pointer-events-none opacity-50" : ""
                                            }`}
                                            aria-disabled={page >= totalPages}
                                        >
                                            Next
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}