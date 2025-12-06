import { AdminPageWrapper } from "../components/admin/admin-page-wrapper";
import db from "@/lib/server/db";
import {PlayerCard} from "@/app/components/admin/items/player-card";
import {TournamentCard} from "@/app/components/admin/items/tournament-card"; // <-- your knex instance

export default async function AdminPage() {
    // Get 5 most recent players
    const recentPlayers = await db("players")
        .select("*")
        .orderBy("player_id", "desc")
        .limit(5);

    const upcomingTournament = await db("tournaments as t")
        .leftJoin("sections as s", "t.tournament_id", "s.tournament_id")
        .leftJoin("section_players as sp", "s.section_id", "sp.section_id")
        .select(
            "t.tournament_id",
            "t.name",
            "t.location",
            "t.description",
            "t.start_date",
            db.raw("COUNT(DISTINCT s.section_id) as section_count"),
            db.raw("COUNT(DISTINCT sp.player_id) as player_count")
        )
        .where("t.start_date", ">=", new Date())
        .groupBy("t.tournament_id")
        .orderBy("t.start_date", "asc")
        .first();

    return (
        <AdminPageWrapper>
            <div className="space-y-6">
                <header>
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Overview of club activity.</p>
                </header>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Recent Registrations Card */}
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                        <h3 className="text-lg font-semibold leading-none tracking-tight mb-4">
                            Recent Registrations
                        </h3>
                        <div className="space-y-4">
                            {recentPlayers.length === 0 ? (
                                <p className="text-sm text-gray-500">No players registered yet.</p>
                            ) : (
                                <ul className="divide-y">
                                    {recentPlayers.map((player) => (
                                        <li key={player.player_id} className="py-2 flex justify-between items-center">
                                            <PlayerCard player={player} />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Recent Tournament Card */}
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                        <h3 className="text-lg font-semibold leading-none tracking-tight mb-4">
                            Upcoming Tournament
                        </h3>
                        <TournamentCard tournament={upcomingTournament}/>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
