import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-24 px-6 bg-white dark:bg-black sm:items-start">
          {/* Logo and Navigation */}
          <header className="w-full flex flex-col items-center sm:flex-row sm:justify-between mb-10">
            <div className="flex items-center gap-3">
              <Image
                  className="dark:invert"
                  src="/chess-logo.svg"
                  alt="Crusaders Chess Club Logo"
                  width={48}
                  height={48}
                  priority
              />
              <span className="text-2xl font-bold text-black dark:text-zinc-50">
              Crusaders Chess Club
            </span>
            </div>
            <nav className="mt-4 sm:mt-0 flex gap-6 text-base font-medium">
              <Link href="/about" className="hover:underline text-zinc-700 dark:text-zinc-200">About</Link>
              <Link href="/tournaments" className="hover:underline text-zinc-700 dark:text-zinc-200">Tournaments</Link>
              <Link href="/registration" className="hover:underline text-zinc-700 dark:text-zinc-200">Registration</Link>
              <Link href="/dashboard" className="hover:underline text-zinc-700 dark:text-zinc-200">Player Dashboard</Link>
              <Link href="/support" className="hover:underline text-zinc-700 dark:text-zinc-200">Support</Link>
            </nav>
          </header>

          {/* Hero Section */}
          <section className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left mb-12">
            <h1 className="text-4xl font-semibold leading-tight text-black dark:text-zinc-50">
              Welcome to the Crusaders Chess Club
            </h1>
            <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Your all-in-one platform for chess tournaments, registration, and player management. Join our community to compete, learn, and track your chess journey.
            </p>
          </section>

          {/* Call to Action */}
          <section className="flex flex-col gap-4 w-full sm:flex-row sm:justify-center mb-16">
            <Link
                href="/tournaments"
                className="flex h-12 items-center justify-center gap-2 rounded-full bg-black text-white px-6 font-medium transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
            >
              View Upcoming Tournaments
            </Link>
            <Link
                href="/registration"
                className="flex h-12 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 font-medium transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            >
              Register Now
            </Link>
          </section>

          {/* Footer */}
          <footer className="w-full text-center text-sm text-zinc-500 dark:text-zinc-400 mt-auto">
            &copy; {new Date().getFullYear()} Crusaders Chess Club. All rights reserved.
          </footer>
        </main>
      </div>
  );
}