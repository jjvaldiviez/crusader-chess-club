import Link from "next/link";
import Image from "next/image";

export function AdminNavBar() {
    return (
        <nav className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-black">
            <div className="mx-auto flex max-w-5xl items-center justify-between">
                {/* Logo & Brand */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        className="dark:invert"
                        src="/chess-logo.svg"
                        alt="Crusaders Chess Club Logo"
                        width={32}
                        height={32}
                        priority
                    />
                    <span className="text-lg font-bold text-black dark:text-white hidden sm:block">Crusaders Chess</span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-6 text-sm font-medium">
                    <Link href="/admin" className="text-zinc-600 transition-colors hover:text-black dark:text-white">
                        Admin Dashboard
                    </Link>
                    <Link
                        href="/admin/tournament-manager"
                        className="text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
                    >
                        Tournament Manager
                    </Link>
                    <Link
                        href="/admin/player-manager"
                        className="text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
                    >
                        Player Manager
                    </Link>
                    <Link
                        href="/admin/announcements"
                        className="text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
                    >
                        Announcements
                    </Link>
                </div>
            </div>
        </nav>
    );
}