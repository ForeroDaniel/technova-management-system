"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/app/api/supabase";

export default function Logout() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
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
