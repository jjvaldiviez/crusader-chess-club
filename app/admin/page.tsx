import { AdminPageWrapper } from "../components/admin/admin-page-wrapper";
import db from "@/lib/server/db"; // <-- your knex instance

export default async function AdminPage() {
    // Get 5 most recent players
    const recentPlayers = await db("players")
        .select("*")
        .orderBy("player_id", "desc")
        .limit(5);

    // Get most recent tournament + section count
    const recentTournament = await db("tournaments as t")
        .leftJoin("sections as s", "t.tournament_id", "s.tournament_id")
        .select(
            "t.tournament_id",
            "t.name",
            "t.location",
            "t.description",
            "t.start_date",
            db.raw("COUNT(s.section_id) as section_count")
        )
        .groupBy("t.tournament_id")
        .orderBy("t.start_date", "desc")
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
                                            <div>
                                                <p className="font-medium text-sm">
                                                    {player.first_name} {player.last_name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    USCF: {player.uscf_id || "N/A"}
                                                </p>
                                            </div>
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                New
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Recent Tournament Card */}
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                        <h3 className="text-lg font-semibold leading-none tracking-tight mb-4">
                            Latest Tournament
                        </h3>
                        {recentTournament ? (
                            <div className="space-y-2">
                                <h4 className="text-xl font-bold text-primary">
                                    {recentTournament.name}
                                </h4>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p>
                                        📅{" "}
                                        {recentTournament.start_date
                                            ? new Date(recentTournament.start_date).toLocaleDateString()
                                            : "TBD"}
                                    </p>
                                    <p>📍 {recentTournament.location || "Online"}</p>
                                    <p>📊 {recentTournament.section_count} Sections</p>
                                </div>
                                <p className="text-sm mt-4 text-gray-500 line-clamp-3">
                                    {recentTournament.description}
                                </p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No tournaments found.</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
