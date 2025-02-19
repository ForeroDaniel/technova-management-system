"use client"

import { useTheme } from "next-themes"

export function ThemeAwareLogo({ className }: { className?: string }) {
    const { theme } = useTheme()
    
    return (
        <img 
            src={theme === "dark" ? "/logo-dark.svg" : "/logo.svg"} 
            alt="TechNova Logo" 
            className={className}
        />
    )
} 