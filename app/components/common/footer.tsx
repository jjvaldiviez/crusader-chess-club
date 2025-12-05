import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-zinc-200 bg-white px-6 py-8 dark:border-zinc-800 dark:bg-black">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 sm:flex-row">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    &copy; {new Date().getFullYear()} Crusaders Chess Club. All rights reserved.
                </p>
                <div className="flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    <Link href="/about" className="hover:text-black dark:hover:text-white">
                        About
                    </Link>
                    <Link href="/tournaments" className="hover:text-black dark:hover:text-white">
                        Tournaments
                    </Link>
                    <Link href="/contact" className="hover:text-black dark:hover:text-white">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    );
}