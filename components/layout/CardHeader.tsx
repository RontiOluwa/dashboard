import React from 'react'
import Link from 'next/link';
import {
    ArrowRight,
} from 'lucide-react';

interface CardHeaderProps {
    title: string;
    url: string;
}

function CardHeader({ title, url }: CardHeaderProps) {
    return (
        <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <Link
                    href={url}
                    className="inline-flex items-center text-sm font-medium text-pagrin-600 hover:text-pagrin-700"
                >
                    View all
                    <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
            </div>
        </div>
    )
}

export default CardHeader