/**
 * Header Component
 * 
 * A simple header that displays:
 * - The application title (TechNova)
 * - A subtitle (Management System)
 * - The company logo that adapts to the current theme
 * 
 * The header takes up 400px in height and centers all content.
 */

"use client"

import ThemeAwareLogo from "@/components/layout/theme-aware-logo"

export default function Header() {
    return (
        // Main header container with full width and fixed height
        <header className="w-full h-[400px] pb-16">
            {/* Center content both vertically and horizontally */}
            <div className="flex flex-col justify-center items-center h-full">
                {/* Main title with gradient effect
                    - text-5xl: Large on mobile
                    - md:text-7xl: Larger on medium screens
                    - lg:text-8xl: Largest on big screens */}
                <h1 className="text-5xl font-bold tracking-tight leading-none 
                             bg-gradient-to-r from-transparent via-current to-transparent 
                             bg-clip-text font-extrabold md:text-7xl lg:text-8xl">
                    TechNova
                </h1>

                {/* Subtitle with muted color */}
                <h2 className="text-2xl text-muted-foreground">
                    Management System
                </h2>

                {/* Logo that changes based on theme */}
                <ThemeAwareLogo className="w-24 h-24 mt-0" />
            </div>
        </header>
    )
} 