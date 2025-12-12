import React from "react";
import Link from "next/link";

interface ProfileSnapshotProps {
    player: any
}
export function PlayerSnapshot({player}: ProfileSnapshotProps) {
    const isExpired =
        player.uscf_expiration && new Date(player.uscf_expiration) < new Date();

    return (
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">Profile</h2>
            <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <div>
                    <span className="block font-medium text-zinc-900 dark:text-zinc-200">Name</span>
                    {player.first_name} {player.last_name}
                </div>
                <div>
                    <span className="block font-medium text-zinc-900 dark:text-zinc-200">USCF ID</span>
                    {player.uscf_id ? player.uscf_id : "Not provided"}
                </div>
                <div>
                    <span className="block font-medium text-zinc-900 dark:text-zinc-200">USCF Exp</span>
                    <div className="flex items-center gap-2">
                        {player.uscf_expiration ? new Date(player.uscf_expiration).toLocaleDateString() : "Not provided"}
                        {isExpired && (
                            <span className="text-xs bg-red-400 text-white px-2 py-1 rounded-full">Expired</span>
                        )}
                    </div>
                </div>
                <div>
                    <span className="block font-medium text-zinc-900 dark:text-zinc-200">Age</span>
                    {player.age ? player.age : "Not provided"}
                </div>
            </div>
            <button className="mt-6 w-full rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                Edit Profile
            </button>
        </div>
    )
}



