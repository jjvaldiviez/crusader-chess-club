import {AdminPageWrapper} from "@/app/components/admin/admin-page-wrapper";
import db from "@/lib/server/db";

export default async function PlayerEditPage(player_id: any) {

    const player = await
        db("players").where("player_id", player_id).first();

    return (
        <AdminPageWrapper>
            <section>Edit Player</section>
        </AdminPageWrapper>
    );
}