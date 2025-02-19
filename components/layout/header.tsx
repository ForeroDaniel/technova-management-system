"use client"

import ThemeAwareLogo  from "@/components/layout/theme-aware-logo"

export default function Header() {
    return (
        <header className="w-full h-[400px] pb-16">
            <div className="flex flex-col justify-center items-center h-full">
                <h1 className="text-5xl font-bold tracking-tight leading-none bg-gradient-to-r from-transparent via-current to-transparent bg-clip-text font-extrabold md:text-7xl lg:text-8xl">TechNova</h1>
                <h2 className="text-2xl text-muted-foreground">Management System</h2>
                <ThemeAwareLogo className="w-24 h-24 mt-0" />
            </div>
        </header>
    )
} 