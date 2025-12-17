import { AdminPageWrapper } from "../components/admin/admin-page-wrapper";
import db from "@/lib/server/db";
import {PlayerCard} from "@/app/components/admin/items/player-card";
import {TournamentCard} from "@/app/components/admin/items/tournament-card";
import {getAppDataSource} from "@/backend/data-source";
import {Registration} from "@/backend/entity/Registration"; // <-- your knex instance

export default async function AdminPage() {

    const ds = await getAppDataSource();
    const registrationsRepo = ds.getRepository(Registration);
    // Get 5 most recent players
    const recentPlayers = await db("players")
        .select("*")
        .orderBy("player_id", "desc")
        .limit(5);

    const upcomingTournament = await registrationsRepo
        .createQueryBuilder("r")
        .leftJoinAndSelect("r.tournament", "t")
        .leftJoinAndSelect("r.section", "s")
        .andWhere("t.startDate >= :now", {now: new Date()})
        .orderBy("t.startDate", "ASC")
        .getOne();

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
                        <TournamentCard r={upcomingTournament}/>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
