import React from "react";
import Link from "next/link";

interface PagesBarProps {
    page: any,
    totalPages: any,
    query: any
}
export function PagesBar({page, totalPages, query}: PagesBarProps) {

    return (
        <div className="flex items-center justify-between border-t pt-4 mt-4">
            <div className="text-sm text-muted-foreground">
                Page {page} of {totalPages === 0 ? 1 : totalPages}
            </div>
            <div className="flex gap-2">
                <Link
                    href={`?query=${query}&page=${page - 1}`}
                    className={`px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-100 ${
                        page <= 1 ? "pointer-events-none opacity-50" : ""
                    }`}
                    aria-disabled={page <= 1}
                >
                    Previous
                </Link>
                <Link
                    href={`?query=${query}&page=${page + 1}`}
                    className={`px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-100 ${
                        page >= totalPages ? "pointer-events-none opacity-50" : ""
                    }`}
                    aria-disabled={page >= totalPages}
                >
                    Next
                </Link>
            </div>
        </div>
    )
}