import React from "react";

interface TournamentViewProps {
    tournament: any
}

export function TournamentCard({tournament}: TournamentViewProps) {
    return (
        <div>
            <p className="font-medium text-sm">{tournament.name}</p>
        </div>
    )
}