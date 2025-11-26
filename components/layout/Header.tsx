import React from 'react'

interface HeaderProps {
    title: string;
    desc: string;
}

export default function Header({ title, desc }: HeaderProps) {
    return (
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
            <p className="mt-2 text-sm text-gray-600">
                {desc}
            </p>
        </div>
    )
}
