'use client';

import { useEffect, useState } from 'react';

/**
 * Component for displaying a list of employees
 * 
 * This component fetches employees from the API and displays them in a list
 * with a loading state and error handling.
 */
export default function Employees() {
    const [employees, setEmployees] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEmployees() {
            try {
                const response = await fetch('/api/employees');
                const result = await response.json();
                
                if (result.error) {
                    setError(result.error);
                } else {
                    setEmployees(result.data);
                }
            } catch (err) {
                setError('Error fetching employees');
            } finally {
                setLoading(false);
            }
        }

        fetchEmployees();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Empleados</h1>
            {employees.length === 0 ? (
                <p>No hay empleados disponibles</p>
            ) : (
                <div className="space-y-4">
                    {employees.map((employee: any) => (
                        <div key={employee.id} className="border p-4 rounded-lg">
                            <pre>{JSON.stringify(employee, null, 2)}</pre>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 