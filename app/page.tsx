import {MainPageWrapper} from "@/app/components/common/page-wrapper";
import {NavBar} from "@/app/components/common/navbar";
import {HeroSection} from "@/app/components/home/hero";

export default function Home() {
    return (
        <MainPageWrapper>
            {/* Hero Section */}
            <section className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left mb-12">
                <h1 className="text-4xl font-semibold leading-tight text-black dark:text-zinc-50">
                    Welcome to the Crusaders Chess Club
                </h1>
                <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                    Your all-in-one platform for chess tournaments, registration, and player management. Join our community to compete, learn, and track your chess journey.
                </p>
            </section>
        </MainPageWrapper>
    );
}