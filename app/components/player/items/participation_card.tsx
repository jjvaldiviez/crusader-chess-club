import React from 'react';

interface ParticipationCardProps {
    tournament: any
}

export function ParticipationCard({tournament}: ParticipationCardProps) {
    return (
        <tr key={tournament.id}>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-200">{tournament.name}</td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{new Date(tournament.date).toLocaleDateString()}</td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{tournament.result}</td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{tournament.standing}</td>
        </tr>
    )
}