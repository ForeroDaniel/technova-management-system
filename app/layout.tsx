/**
 * Root Layout Component
 * 
 * This is the main layout wrapper for the entire application.
 * It provides:
 * - Custom fonts (Geist Sans and Mono)
 * - Theme support (light/dark mode)
 * - Basic page structure (header, main content, footer)
 * - Toast notifications
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/layout/theme-provider";

// Load and configure fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define metadata for SEO
export const metadata: Metadata = {
  title: "Technova Management System",
  description: "Sistema de gestión para la plataforma de Technova",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Apply fonts and basic styling to body */}
      <body className={`
        ${geistSans.variable} 
        ${geistMono.variable} 
        antialiased 
        min-h-screen 
        flex 
        flex-col
      `}>
        {/* Theme provider wrapper */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
