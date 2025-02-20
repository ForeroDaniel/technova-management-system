"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@supabase/ssr";

export default function Logout() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const supabase = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                {
                    auth: {
                        persistSession: true,
                    }
                }
            );

            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error logging out:', error.message);
            } else {
                router.push('/login');
            }
        } catch (err) {
            console.error('Unexpected error during logout:', err);
        }
    };

    return (
        <div className="flex justify-center items-center full-width h-[150px]">
            <Button onClick={handleLogout}>
                Cerrar Sesión
            </Button>
        </div>
    );
}
