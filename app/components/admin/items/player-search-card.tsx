import React from "react";

interface PlayerViewProps {
    player: any
}
export function PlayerSearchCard({player}: PlayerViewProps) {
    const isExpired =
        player.uscf_expiration && new Date(player.uscf_expiration) < new Date();

    return (
        <div className="py-1">
            <p className="font-medium text-sm">
                {player.first_name} {player.last_name}
            </p>
            <p className="text-xs text-gray-500">
                USCF: {player.uscf_id || "N/A"}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-2">
                USCF EXP: {" "}
                {player.uscf_expiration
                    ? new Date(player.uscf_expiration).toLocaleDateString()
                    : "N/A"}
                {isExpired && (
                    <span className="text-xs bg-red-400 text-white px-2 py-1 rounded-full">Expired</span>
                )}
            </p>
        </div>
    )
}