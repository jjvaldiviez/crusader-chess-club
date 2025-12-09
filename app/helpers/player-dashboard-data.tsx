import db from "@/lib/server/db";

export async function getPlayerDashboardData(player_id: number) {
    const player = await db("players")
        .select("*")
        .where("player_id", player_id)
        .first();

    if (!player) return null;

    const upcomingTournaments = await db("tournaments as t")
        .join("sections as s", "t.tournament_id", "s.tournament_id")
        .join("section_players as sp", "s.section_id", "sp.section_id")
        .select(
            "t.tournament_id as id",
            "t.name",
            "t.start_date as date",
            "t.location",
            db.raw("'Registered' as status")
        )
        .where("sp.player_id", player_id)
        .andWhere("t.start_date", ">=", new Date())
        .groupBy("t.tournament_id")
        .orderBy("t.start_date", "asc");

    const pastTournaments = await db("tournaments as t")
        .join("sections as s", "t.tournament_id", "s.tournament_id")
        .join("section_players as sp", "s.section_id", "sp.section_id")
        .select(
            "t.tournament_id as id",
            "t.name",
            "t.start_date as date",
            db.raw("'N/A' as result"),
            db.raw("'N/A' as standing")
        )
        .where("sp.player_id", player_id)
        .andWhere("t.start_date", "<", new Date())
        .groupBy("t.tournament_id")
        .orderBy("t.start_date", "desc");

    return { player, upcomingTournaments, pastTournaments };
}