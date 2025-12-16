import React from 'react';
import {ParticipationCard} from "@/app/components/player/items/participation_card";
import {Registration} from "@/backend/entity/Registration";

interface ParticipationModuleProps {
    tournaments: Registration[]
}

export function ParticipationModule({tournaments}: ParticipationModuleProps) {
    return(
        <div>
            <h2 className="mb-4 text-xl font-bold text-black dark:text-white">Past Participation</h2>
            <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                    <thead className="bg-zinc-50 dark:bg-zinc-950">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Event</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Standing</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                    {tournaments.map((r: Registration
                    ) => (
                        <ParticipationCard key={`past-tournament-${r.id}`} tournament={r}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}