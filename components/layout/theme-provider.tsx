/**
 * ThemeProvider Component
 * 
 * Wraps the application with next-themes provider to enable theme switching.
 * Configuration:
 * - Uses CSS classes for theme switching
 * - Defaults to system theme
 * - Enables system theme detection
 * - Prevents transition flicker
 */

"use client"

import * as React from "react"
import { 
    ThemeProvider as NextThemesProvider, 
    type ThemeProviderProps 
} from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider 
            // Use CSS classes for theme switching
            attribute="class" 
            // Start with system preference
            defaultTheme="system" 
            // Allow system theme detection
            enableSystem 
            // Prevent flash during theme switch
            disableTransitionOnChange
            {...props}
        >
            {children}
        </NextThemesProvider>
    )
} 