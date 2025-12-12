import Link from "next/link";
import {ParticipationModule} from "@/app/components/player/modules/participation-module";
import {AdminPageWrapper} from "@/app/components/admin/admin-page-wrapper";
import {notFound} from "next/navigation"
import db from "@/lib/server/db";
import React from "react";
import { PlayerSnapshot } from "@/app/components/player/modules/player-snapshot";
import {UpcomingTournaments} from "@/app/components/player/modules/upcoming-tournament-module";

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
            <h1 className="mb-8 text-3xl font-bold text-black dark:text-white">{player.first_name} {player.last_name}</h1>
            <div className="grid gap-8 md:grid-cols-3">
                {/* Profile Sidebar */}
                <aside className="md:col-span-1">
                    <PlayerSnapshot player={player}/>
                </aside>

                {/* Main Content - Tournaments */}
                <section className="md:col-span-2 space-y-8">
                    <div>
                        <UpcomingTournaments upcomingTournaments={ upcomingTournaments}/>
                        <div className="mt-4">
                            <Link href="/registration" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
                                + Register for a new tournament
                            </Link>
                        </div>
                    </div>
                    <ParticipationModule tournaments={pastTournaments}/>
                </section>
            </div>
        </AdminPageWrapper>
    );
}