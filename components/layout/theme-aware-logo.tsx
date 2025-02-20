/**
 * ThemeAwareLogo Component
 * 
 * A smart logo component that changes its appearance based on the current theme.
 * It handles:
 * - Switching between light/dark theme logos
 * - Preventing flash of wrong theme on load
 * - Accepting custom className for styling
 * - Using Next.js Image optimization
 */

"use client"

import Image from 'next/image'
import { useTheme } from "next-themes"
import { useEffect, useState } from 'react'

// Props type definition with optional className
interface ThemeAwareLogoProps {
    className?: string;
}

export default function ThemeAwareLogo({ className }: ThemeAwareLogoProps) {
    // Get theme information from next-themes
    const { theme, systemTheme } = useTheme()
    
    // Handle mounting state to prevent hydration mismatch
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    // Show empty div while loading to maintain layout
    if (!mounted) {
        return <div className={className} />
    }

    // Determine which logo to show based on theme
    const currentTheme = theme === 'system' ? systemTheme : theme
    const logoSrc = currentTheme === 'dark' ? '/logo-dark.svg' : '/logo.svg'

    return (
        <Image 
            src={logoSrc} 
            alt="TechNova Logo" 
            className={className}
            width={150}
            height={40}
            priority // Since this is likely the main logo and important for LCP
        />
    )
} 