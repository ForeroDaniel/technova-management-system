'use client';

import { useEffect, useState } from 'react';
import { DataTable } from './data-table';
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
 * - Supports activity editing and deletion (UI only)
 * - Shows hours, employee IDs, project IDs, and dates
 */
export default function Activities() {
    // State management for activities data, loading state, and errors
    const [activities, setActivities] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch activities data when component mounts
    useEffect(() => {
        async function fetchActivities() {
            try {
                const response = await fetch('/api/activities');
                const result = await response.json();
                
                // Handle API response
                if (result.error) {
                    setError(result.error);
                } else {
                    setActivities(result.data);
                }
            } catch (err) {
                setError('Error fetching activities');
            } finally {
                setLoading(false);
            }
        }

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
                <>
                    {/* Display activities in DataTable component */}
                    <DataTable columns={columns} data={activities} />
                    
                    {/* Raw data display (commented out for reference)
                    <div className="space-y-4">
                        {activities.map((activity: any) => (
                            <div key={activity.id} className="border p-4 rounded-lg">
                                <pre>{JSON.stringify(activity, null, 2)}</pre>
                            </div>
                        ))}
                    </div>
                    */}
                </>
            )}
        </div>
    );
}
