'use client';

import { useEffect, useState } from 'react';

/**
 * Component for displaying a list of projects
 * 
 * This component fetches projects from the API and displays them in a list
 * with a loading state and error handling.
 */
export default function Projects() {
    const [projects, setProjects] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch('/api/projects');
                const result = await response.json();
                
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Proyectos</h1>
            {projects.length === 0 ? (
                <p>No hay proyectos disponibles</p>
            ) : (
                <div className="space-y-4">
                    {projects.map((project: any) => (
                        <div key={project.id} className="border p-4 rounded-lg">
                            <pre>{JSON.stringify(project, null, 2)}</pre>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 