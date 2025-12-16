import React from 'react';
import {Registration} from "@/backend/entity/Registration";

interface ParticipationCardProps {
    tournament: Registration
}

export function ParticipationCard({tournament}: ParticipationCardProps) {
    return (
        <tr key={tournament.id}>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-200">{tournament.tournament.name}</td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{new Date(tournament.tournament.startDate).toLocaleDateString()}</td>
        </tr>
    )
}