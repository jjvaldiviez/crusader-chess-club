import React from "react";
import {Registration} from "@/backend/entity/Registration";

interface UpcomingTournamentModuleProps {
    upcomingTournaments: Registration[]
}
export function UpcomingTournaments({upcomingTournaments}: UpcomingTournamentModuleProps) {
    return (
        <div>
            <h2 className="mb-4 text-xl font-bold text-black dark:text-white">Upcoming Tournaments</h2>
            {upcomingTournaments.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {upcomingTournaments.map((r : Registration) => (
                        <div
                            key={`upcoming-tournament-${r.id}`}
                            className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                        >
                            <div>
                                <h3 className="font-semibold text-black dark:text-white">{r.tournament.name}</h3>
                                <p className="text-sm text-zinc-500">{new Date(r.tournament.startDate).toLocaleDateString()} • {r.tournament.location}</p>
                            </div>
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            {r.tournament.description}
                          </span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-zinc-500">No upcoming tournaments registered.</p>
            )}
        </div>
    );
}