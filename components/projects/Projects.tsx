'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { Spinner } from '@/components/ui/spinner';

/**
 * Projects Component
 * 
 * Main component for displaying and managing projects.
 * Features:
 * - Fetches project data from API
 * - Displays projects in a filterable and paginated table
 * - Provides loading and error states
 * - Supports project editing and deletion (UI only)
 */
export default function Projects() {
    // State management for projects data, loading state, and errors
    const [projects, setProjects] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch projects data when component mounts
    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch('/api/projects');
                const result = await response.json();
                
                // Handle API response
                if (result.error) {
                    setError(result.error);
                } else {
                    setProjects(result.data);
                }
            } catch (err) {
                setError('Error fetching projects');
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    // Show loading state while fetching data
    if (loading) return <Spinner />;
    // Show error message if fetch failed
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Proyectos</h1>
            {/* Show message if no projects available */}
            {projects.length === 0 ? (
                <p>No hay proyectos disponibles</p>
            ) : (
                <DataTable 
                    columns={columns} 
                    data={projects}
                    filterColumn="name"
                    filterPlaceholder="Filtrar por nombre..."
                />
            )}
        </div>
    );
} 