import Image from "next/image";
import Link from "next/link";
import {MainPageWrapper} from "@/app/components/common/page-wrapper";

export default function About() {
    return (
        <MainPageWrapper>
            <section className="mb-8 text-center">
                <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    The Crusaders Chess Club is dedicated to fostering a vibrant chess community for players of all ages and skill levels. Our mission is to promote learning, competition, and camaraderie through regular tournaments, events, and educational opportunities.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Founded by passionate chess enthusiasts, we strive to provide a welcoming environment where members can improve their game, connect with others, and enjoy the timeless challenge of chess.
                </p>
            </section>
            <section className="mb-10 w-full">
                <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-2">Our Values</h2>
                <ul className="list-disc list-inside text-zinc-700 dark:text-zinc-300">
                    <li>Community and Inclusion</li>
                    <li>Continuous Learning</li>
                    <li>Fair Play and Sportsmanship</li>
                    <li>Competitive Spirit</li>
                </ul>
            </section>
            <nav className="flex gap-4">
                <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">Home</Link>
                <Link href="/tournaments" className="text-blue-600 hover:underline dark:text-blue-400">Tournaments</Link>
            </nav>
        </MainPageWrapper>
    );
}