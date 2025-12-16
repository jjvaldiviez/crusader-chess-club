import React from "react";
import Link from "next/link";
import {Player} from "@/backend/entity/Player";

interface PlayerViewProps {
    player: Player
}
export function PlayerSearchCard({player}: PlayerViewProps) {
    const isExpired =
        player.uscfExpiration && new Date(player.uscfExpiration) < new Date();

    return (
        <Link href={`/player_dashboard/${player.id}`}>
            <div className="py-1">
                    <p className="font-medium text-sm">
                        {player.firstName} {player.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                        USCF: {player.uscfId || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                        USCF EXP: {" "}
                        {player.uscfExpiration
                            ? new Date(player.uscfExpiration).toLocaleDateString()
                            : "N/A"}
                        {isExpired && (
                            <span className="text-xs bg-red-400 text-white px-2 py-1 rounded-full">Expired</span>
                        )}
                    </p>
            </div>
        </Link>
    )
}