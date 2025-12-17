import Link from "next/link";
import {ParticipationModule} from "@/app/components/player/modules/participation-module";
import {AdminPageWrapper} from "@/app/components/admin/admin-page-wrapper";
import {notFound} from "next/navigation"
import db from "@/lib/server/db";
import React from "react";
import { PlayerSnapshot } from "@/app/components/player/modules/player-snapshot";
import {UpcomingTournaments} from "@/app/components/player/modules/upcoming-tournament-module";
import {getAppDataSource} from "@/backend/data-source";
import {Player} from "@/backend/entity/Player";
import {Registration} from "@/backend/entity/Registration";

export default async function DashboardPage(
    {
        params,
    }: {
        params: Promise<{player_id: string}>
    }
) {

    const ds = await getAppDataSource();

    const playerRepo = ds.getRepository(Player);
    const registrationsRepo = ds.getRepository(Registration);

    const basePlayerQb = playerRepo.createQueryBuilder("p");

    const playerIdObj = await params;
    let playerId = Number(playerIdObj.player_id);

    const player = await basePlayerQb
        .where("p.id = :id", {id: playerId})
        .getOne();

    if (!player) {
        notFound();
    }

    const upcomingTournaments = await registrationsRepo
        .createQueryBuilder("r")
        .leftJoinAndSelect("r.tournament", "t")
        .leftJoinAndSelect("r.section", "s")
        .where("r.playerId = :id", {id: playerId})
        .andWhere("t.startDate >= :now", {now: new Date()})
        .orderBy("t.startDate", "ASC")
        .getMany();

    const pastTournaments = await registrationsRepo
        .createQueryBuilder("r")
        .leftJoinAndSelect("r.tournament", "t")
        .leftJoinAndSelect("r.section", "s")
        .where("r.playerId = :id", {id: playerId})
        .andWhere("t.startDate < :now", {now: new Date()})
        .orderBy("t.startDate", "DESC")
        .getMany();

    return (
        <AdminPageWrapper>
            <h1 className="mb-8 text-3xl font-bold text-black dark:text-white">{player.firstName} {player.lastName}</h1>
            <div className="grid gap-8 md:grid-cols-3">
                {/* Profile Sidebar */}
                <aside className="md:col-span-1">
                    <PlayerSnapshot player={player}/>
                </aside>

                {/* Main Content - Tournaments */}
                <section className="md:col-span-2 space-y-8">
                    <div>
                        <UpcomingTournaments upcomingRegistrations={ upcomingTournaments}/>
                        <div className="mt-4">
                            <Link href="/registration" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
                                + Register for a new tournament
                            </Link>
                        </div>
                    </div>
                    <ParticipationModule registrations={pastTournaments}/>
                </section>
            </div>
        </AdminPageWrapper>
    );
}