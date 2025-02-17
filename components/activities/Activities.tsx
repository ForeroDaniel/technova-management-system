'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { Spinner } from '@/components/ui/spinner';

/**
 * Activities Component
 * 
 * Main component for displaying and managing activities.
 * Features:
 * - Fetches activity data from API
 * - Displays activities in a filterable and paginated table
 * - Provides loading and error states
 * - Supports activity editing and deletion
 * - Auto-refreshes data after updates
 */
export default function Activities() {
    // State management for activities data, loading state, and errors
    const [activities, setActivities] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Function to fetch activities data
    const fetchActivities = async () => {
        try {
            const response = await fetch('/api/activities');
            const result = await response.json();
            
            // Handle API response
            if (result.error) {
                setError(result.error);
            } else {
                // Sort activities by ID by default
                const sortedActivities = result.data.sort((a: any, b: any) => a.id - b.id);
                setActivities(sortedActivities);
            }
        } catch (err) {
            setError('Error fetching activities');
        } finally {
            setLoading(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchActivities();
    }, []);

    // Show loading state while fetching data
    if (loading) return <Spinner />;
    // Show error message if fetch failed
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Actividades</h1>
            {/* Show message if no activities available */}
            {activities.length === 0 ? (
                <p>No hay actividades disponibles</p>
            ) : (
                <DataTable 
                    columns={columns(fetchActivities)} 
                    data={activities}
                    filterColumn="descripcion"
                    filterPlaceholder="Filtrar por descripción..."
                />
            )}
        </div>
    );
}
