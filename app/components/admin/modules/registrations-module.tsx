import React from "react";
import Search from "@/app/components/admin/items/search-bar";
import {PlayerSearchCard} from "@/app/components/admin/items/player-search-card";
import {PagesBar} from "@/app/components/admin/items/pages-bar";

interface RegistrationsModuleProps {
    players: any,
    page: any,
    totalPages: any,
    query: any
}
export function RegistrationsModule({players, page, totalPages, query}: RegistrationsModuleProps) {

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-4">
                <h3 className="text-lg font-semibold leading-none tracking-tight">
                    Registrations
                </h3>
                <div className="w-full md:w-1/3">
                    <Search placeholder="Search players..." />
                </div>
            </div>

            <div className="space-y-4">
                {players.length === 0 ? (
                    <p className="text-sm text-gray-500">No players found.</p>
                ) : (
                    <>
                        <ul className="divide-y">
                            {players.map((player: any) => (
                                <li key={player.player_id} className="py-2 flex justify-between items-center">
                                    <PlayerSearchCard player={player} />
                                </li>
                            ))}
                        </ul>
                        <PagesBar page={page} totalPages={totalPages} query={query}/>
                    </>
                )}
            </div>
        </div>
    )
}