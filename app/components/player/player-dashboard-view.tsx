import React from "react";
import Link from "next/link";
import { ParticipationModule } from "@/app/components/player/modules/participation-module";

interface PlayerDashboardViewProps {
    data: {
        player: any;
        upcomingTournaments: any[];
        pastTournaments: any[];
    };
}

export function PlayerDashboardView({ data }: PlayerDashboardViewProps) {
    const { player, upcomingTournaments, pastTournaments } = data;
    const isExpired = player.uscf_expiration && new Date(player.uscf_expiration) < new Date();

    return (
        <div className="grid gap-8 md:grid-cols-3 text-left">
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
                <ParticipationModule tournaments={pastTournaments} />
            </section>
        </div>
    );
}