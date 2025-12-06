import React from "react";

interface TournamentViewProps {
    tournament: any
}

export function TournamentCard({tournament}: TournamentViewProps) {
    return (
        tournament ? (
            <div className="space-y-2">
                <h4 className="text-xl font-bold text-primary">
                    {tournament.name}
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                    <p>
                        📅{" "}
                        {tournament.start_date
                            ? new Date(tournament.start_date).toLocaleDateString()
                            : "TBD"}
                    </p>
                    <p>📍 {tournament.location || "Online"}</p>
                    <p>📊 {tournament.section_count} Sections</p>
                    <p> {tournament.player_count || 0} Registered Players</p>
                </div>
                <p className="text-sm mt-4 text-gray-500 line-clamp-3">
                    {tournament.description}
                </p>
            </div>
        ) : (
            <p className="text-sm text-gray-500">No tournaments found.</p>
        )
    );
}