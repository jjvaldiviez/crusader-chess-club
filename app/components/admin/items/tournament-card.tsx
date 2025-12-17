import React from "react";
import {Registration} from "@/backend/entity/Registration";

interface TournamentViewProps {
    r: Registration | null
}

export function TournamentCard({r}: TournamentViewProps) {
    return (
        r ? (
            <div className="space-y-2">
                <h4 className="text-xl font-bold text-primary">
                    {r.tournament.name}
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                    <p>
                        📅{" "}
                        {r.tournament.startDate
                            ? new Date(r.tournament.startDate).toLocaleDateString()
                            : "TBD"}
                    </p>
                    <p>📍 {r.tournament.location || "Online"}</p>
                    <p>📊 Sections</p>
                    <p>  Registered Players</p>
                </div>
                <p className="text-sm mt-4 text-gray-500 line-clamp-3">
                    {r.tournament.description || "No description provided."}{" "}
                </p>
            </div>
        ) : (
            <p className="text-sm text-gray-500">No tournaments found.</p>
        )
    );
}