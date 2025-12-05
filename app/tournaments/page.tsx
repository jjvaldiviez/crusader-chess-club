import Link from "next/link";

export default function Tournaments() {
    // Placeholder data; replace with dynamic data fetching later
    const tournaments = [
        {
            id: 1,
            name: "Winter Open 2025",
            date: "2025-01-15",
            format: "Swiss",
            location: "Community Center",
            status: "Registration Open",
        },
        {
            id: 2,
            name: "Spring Blitz",
            date: "2025-03-10",
            format: "Blitz",
            location: "Online",
            status: "Coming Soon",
        },
    ];

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-20 px-6 bg-white dark:bg-black">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-black dark:text-zinc-50">
                        Upcoming & Active Tournaments
                    </h1>
                    <p className="mt-2 text-zinc-700 dark:text-zinc-300">
                        Browse and register for our latest chess tournaments. Click on a tournament for more details.
                    </p>
                </header>
                <section className="w-full flex flex-col gap-6 mb-10">
                    {tournaments.map((t) => (
                        <div
                            key={t.id}
                            className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-5 bg-zinc-50 dark:bg-zinc-900 shadow-sm"
                        >
                            <h2 className="text-xl font-semibold text-black dark:text-zinc-50">{t.name}</h2>
                            <div className="text-zinc-600 dark:text-zinc-300">
                                <span className="block">Date: {t.date}</span>
                                <span className="block">Format: {t.format}</span>
                                <span className="block">Location: {t.location}</span>
                                <span className="block font-medium mt-2">{t.status}</span>
                            </div>
                            <Link
                                href="/registration"
                                className="inline-block mt-4 px-4 py-2 rounded-full bg-black text-white font-medium hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 transition-colors"
                            >
                                Register
                            </Link>
                        </div>
                    ))}
                </section>
                <nav className="flex gap-4">
                    <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">Home</Link>
                    <Link href="/about" className="text-blue-600 hover:underline dark:text-blue-400">About</Link>
                </nav>
            </main>
        </div>
    );
}