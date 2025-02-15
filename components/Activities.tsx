'use client';

import { useEffect, useState } from 'react';

/**
 * Component for displaying a list of activities
 * 
 * This component fetches activities from the API and displays them in a list
 * with a loading state and error handling.
 * 
 *  it will show either:
 * The activities data if there is data in the table
 * "No hay actividades disponibles" if the table is empty
 * An error message if there's a connection problem
 */

export default function Activities() {
    const [activities, setActivities] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchActivities() {
            try {
                const response = await fetch('/api/activities');
                const result = await response.json();
                
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Actividades</h1>
            {activities.length === 0 ? (
                <p>No hay actividades disponibles</p>
            ) : (
                <div className="space-y-4">
                    {activities.map((activity: any) => (
                        <div key={activity.id} className="border p-4 rounded-lg">
                            <pre>{JSON.stringify(activity, null, 2)}</pre>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
