'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    // Use a ref to store the timeout ID so it persists across renders
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    function handleSearch(term: string) {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            params.set('page', '1'); // Reset to page 1 on new search
            if (term) {
                params.set('query', term);
            } else {
                params.delete('query');
            }
            replace(`${pathname}?${params.toString()}`);
        }, 300); // 300ms debounce
    }

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    );
}