/**
 * Footer Component
 * 
 * Displays:
 * - A theme toggle switch (dark/light mode)
 * - The company logo
 * - Attribution and GitHub link
 * 
 * The component handles theme switching and ensures proper mounting
 * before rendering to prevent hydration issues.
 */

"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import ThemeAwareLogo from "@/components/layout/theme-aware-logo"
import { useEffect, useState } from "react"

export default function Footer() {
    // Theme handling
    const { theme, setTheme } = useTheme()
    
    // Prevent hydration mismatch
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    // Don't render anything until mounted
    if (!mounted) return null

    return (
        <footer className="py-6 md:py-0 h-[200px]">
            <div className="flex flex-col justify-center items-center h-full">
                {/* Theme toggle section */}
                <div className="flex items-center gap-2">
                    <Switch 
                        id="theme-switch"
                        checked={theme === "dark"}
                        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    />
                    <Label 
                        htmlFor="theme-switch" 
                        className="text-sm leading-loose text-muted-foreground md:text-left"
                    >
                        ¿te gusta el modo oscuro?
                    </Label>
                    <ThemeAwareLogo className="w-8 h-8 mt-0" />
                </div>

                {/* Attribution section */}
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left mt-6">
                    Built by{" "}
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        Daniel 
                    </a>
                    . The source code is available on{" "}
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        GitHub
                    </a>
                    .
                </p>
            </div>
        </footer>
    )
} 