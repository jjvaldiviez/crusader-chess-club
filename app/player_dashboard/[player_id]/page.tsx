import Link from "next/link";
import {ParticipationModule} from "@/app/components/player/participation_module";
import {AdminPageWrapper} from "@/app/components/admin/admin-page-wrapper";
import {notFound} from "next/navigation"
import db from "@/lib/server/db";
import React from "react";

export default async function DashboardPage(
    {
        params,
    }: {
        params: Promise<{player_id: string}>
    }
) {
    const player_id_object = await params
    let player_id = player_id_object.player_id

    console.log(player_id);

    const player = await db("players")
        .select("*")
        .where("player_id", Number(player_id)) // Ensure number
        .first(); // Ensure called

    if (!player) {
        notFound();
    }

    const isExpired =
        player.uscf_expiration && new Date(player.uscf_expiration) < new Date();

    // Mock tournaments data
    const upcomingTournaments = await db("tournaments as t")
        .join("sections as s", "t.tournament_id", "s.tournament_id")
        .join("section_players as sp", "s.section_id", "sp.section_id")
        .select(
            "t.tournament_id as id",
            "t.name",
            "t.start_date as date",
            "t.location",
            db.raw("'Registered' as status")
        )
        .where("sp.player_id", player_id)
        .andWhere("t.start_date", ">=", new Date())
        .groupBy("t.tournament_id") // Add groupBy to ensure unique tournaments
        .orderBy("t.start_date", "asc");

    const pastTournaments = await db("tournaments as t")
        .join("sections as s", "t.tournament_id", "s.tournament_id")
        .join("section_players as sp", "s.section_id", "sp.section_id")
        .select(
            "t.tournament_id as id",
            "t.name",
            "t.start_date as date",
            db.raw("'N/A' as result"), // Placeholder as games aggregation is complex without dedicated view
            db.raw("'N/A' as standing")
        )
        .where("sp.player_id", player_id)
        .andWhere("t.start_date", "<", new Date())
        .groupBy("t.tournament_id") // Add groupBy here too
        .orderBy("t.start_date", "desc");

    return (
        <AdminPageWrapper>
            <h1 className="mb-8 text-3xl font-bold text-black dark:text-white">Player Dashboard</h1>
            <div className="grid gap-8 md:grid-cols-3">
                {/* Profile Sidebar */}
                <aside className="md:col-span-1">
                    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">My Profile</h2>
                        <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                            <div>
                                <span className="block font-medium text-zinc-900 dark:text-zinc-200">Name</span>
                                {player.first_name} {player.last_name}
                            </div>
                            <div>
                                <span className="block font-medium text-zinc-900 dark:text-zinc-200">USCF ID</span>
                                {player.uscf_id ? player.uscf_id : "Not provided"}
                            </div>
                            <div>
                                <span className="block font-medium text-zinc-900 dark:text-zinc-200">USCF Exp</span>
                                <div className="flex items-center gap-2">
                                    {player.uscf_expiration ? new Date(player.uscf_expiration).toLocaleDateString() : "Not provided"}
                                    {isExpired && (
                                        <span className="text-xs bg-red-400 text-white px-2 py-1 rounded-full">Expired</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <span className="block font-medium text-zinc-900 dark:text-zinc-200">Age</span>
                                {player.age ? player.age : "Not provided"}
                            </div>
                        </div>
                        <button className="mt-6 w-full rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                            Edit Profile
                        </button>
                    </div>
                </aside>

                {/* Main Content - Tournaments */}
                <section className="md:col-span-2 space-y-8">

                    {/* Upcoming Tournaments */}
                    <div>
                        <h2 className="mb-4 text-xl font-bold text-black dark:text-white">Upcoming Tournaments</h2>
                        {upcomingTournaments.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {upcomingTournaments.map((t) => (
                                    <div
                                        key={`upcoming-tournament-${t.id}`}
                                        className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                                    >
                                        <div>
                                            <h3 className="font-semibold text-black dark:text-white">{t.name}</h3>
                                            <p className="text-sm text-zinc-500">{new Date(t.date).toLocaleDateString()} • {t.location}</p>
                                        </div>
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    {t.status}
                  </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-zinc-500">No upcoming tournaments registered.</p>
                        )}
                        <div className="mt-4">
                            <Link href="/registration" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
                                + Register for a new tournament
                            </Link>
                        </div>
                    </div>

                    {/* Past Tournaments */}
                    <ParticipationModule tournaments={pastTournaments}/>
                </section>
            </div>
        </AdminPageWrapper>
    );
}