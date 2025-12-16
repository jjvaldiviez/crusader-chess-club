import {AdminPageWrapper} from "@/app/components/admin/admin-page-wrapper";
import {RegistrationsModule} from "@/app/components/admin/modules/registrations-module";
import {getAppDataSource} from "@/backend/data-source";
import {Player} from "@/backend/entity/Player";
import {buildPlayerListQb} from "@/backend/queries/player-queries";

export default async function PlayerManagerPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page) || 1;
    const query = typeof searchParams.query === 'string' ? searchParams.query : '';
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    const ds = await getAppDataSource();
    const repo = ds.getRepository(Player);
    const baseQb = buildPlayerListQb(repo, { query });

    const totalPlayers = await baseQb.clone().getCount();
    const totalPages = Math.ceil(totalPlayers / pageSize);

    const allPlayers = await baseQb
        .clone()
        .orderBy("p.last_name", "ASC")
        .skip(offset)
        .take(pageSize)
        .getMany();

    return (
        <AdminPageWrapper>
            <div className="space-y-6">
                <header>
                    <h1 className="text-2xl font-bold tracking-tight">Player Dashboard</h1>
                    <p className="text-muted-foreground">Players that signed up with Crusaders Chess.</p>
                </header>
                <RegistrationsModule players={allPlayers} page={page} totalPages={totalPages} query={query}/>
            </div>
        </AdminPageWrapper>
    );
}