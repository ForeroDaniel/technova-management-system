"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from 'react'

interface ThemeAwareLogoProps {
    className?: string;
}

export default function ThemeAwareLogo({ className }: ThemeAwareLogoProps) {
    const { theme, systemTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className={className} /> // Placeholder while loading
    }

    const currentTheme = theme === 'system' ? systemTheme : theme
    const logoSrc = currentTheme === 'dark' ? '/logo-dark.svg' : '/logo.svg'

    return (
        <img 
            src={logoSrc} 
            alt="TechNova Logo" 
            className={className}
        />
    )
} 