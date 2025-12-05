
import Link from "next/link";

export default function DashboardPage() {
    // Mock user data
    const userProfile = {
        name: "Alex Gambit",
        uscfId: "12345678",
        email: "alex.gambit@example.com",
        rating: 1650,
    };

    // Mock tournaments data
    const upcomingTournaments = [
        {
            id: 1,
            name: "Winter Open 2025",
            date: "2025-01-15",
            location: "Community Center",
            status: "Registered",
        },
    ];

    const pastTournaments = [
        {
            id: 101,
            name: "Fall Classic 2024",
            date: "2024-11-20",
            result: "3.5/5.0",
            standing: "4th Place",
        },
        {
            id: 102,
            name: "Summer Rapid",
            date: "2024-08-10",
            result: "4.0/6.0",
            standing: "8th Place",
        },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
            <nav className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mx-auto flex max-w-5xl items-center justify-between">
                    <Link href="/" className="text-xl font-bold text-black dark:text-white">
                        Crusaders Chess
                    </Link>
                    <div className="flex gap-4">
                        <Link href="/tournaments" className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
                            Find Tournaments
                        </Link>
                        <span className="text-sm font-medium text-black dark:text-white">{userProfile.name}</span>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-5xl p-6 py-10">
                <h1 className="mb-8 text-3xl font-bold text-black dark:text-white">Player Dashboard</h1>

                <div className="grid gap-8 md:grid-cols-3">
                    {/* Profile Sidebar */}
                    <aside className="md:col-span-1">
                        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">My Profile</h2>
                            <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                                <div>
                                    <span className="block font-medium text-zinc-900 dark:text-zinc-200">Name</span>
                                    {userProfile.name}
                                </div>
                                <div>
                                    <span className="block font-medium text-zinc-900 dark:text-zinc-200">USCF ID</span>
                                    {userProfile.uscfId}
                                </div>
                                <div>
                                    <span className="block font-medium text-zinc-900 dark:text-zinc-200">Email</span>
                                    {userProfile.email}
                                </div>
                                <div>
                                    <span className="block font-medium text-zinc-900 dark:text-zinc-200">Current Rating</span>
                                    {userProfile.rating}
                                </div>
                            </div>
                            <button className="mt-6 w-full rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                                Edit Profile
                            </button>
                        </div>
                    </aside>

                    {/* Main Content - Tournaments */}
                    <section className="md:col-span-2 space-y-8">

                        {/* Upcoming Tournaments */}
                        <div>
                            <h2 className="mb-4 text-xl font-bold text-black dark:text-white">Upcoming Tournaments</h2>
                            {upcomingTournaments.length > 0 ? (
                                <div className="flex flex-col gap-4">
                                    {upcomingTournaments.map((t) => (
                                        <div
                                            key={t.id}
                                            className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                                        >
                                            <div>
                                                <h3 className="font-semibold text-black dark:text-white">{t.name}</h3>
                                                <p className="text-sm text-zinc-500">{t.date} • {t.location}</p>
                                            </div>
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {t.status}
                      </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-zinc-500">No upcoming tournaments registered.</p>
                            )}
                            <div className="mt-4">
                                <Link href="/registration" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
                                    + Register for a new tournament
                                </Link>
                            </div>
                        </div>

                        {/* Past Tournaments */}
                        <div>
                            <h2 className="mb-4 text-xl font-bold text-black dark:text-white">Past Participation</h2>
                            <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                                <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                                    <thead className="bg-zinc-50 dark:bg-zinc-950">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Event</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Score</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Standing</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                                    {pastTournaments.map((t) => (
                                        <tr key={t.id}>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-200">{t.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{t.date}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{t.result}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{t.standing}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </section>
                </div>
            </main>
        </div>
    );
}