import React from 'react';
import {Registration} from "@/backend/entity/Registration";

interface ParticipationCardProps {
    r: Registration
}

export function ParticipationCard({r}: ParticipationCardProps) {
    return (
        <tr key={`participation-card-${r.playerId}-${r.tournamentId}`}>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-200">{r.tournament.name}</td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{new Date(r.tournament.startDate).toLocaleDateString()}</td>
        </tr>
    )
}