'use client';

import { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Spinner } from '@/components/ui/spinner';

/**
 * Employees Component
 * 
 * Main component for displaying and managing employees.
 * Features:
 * - Fetches employee data from API
 * - Displays employees in a filterable and paginated table
 * - Provides loading and error states
 * - Supports employee editing and deletion (UI only)
 */
export default function Employees() {
    // State management for employees data, loading state, and errors
    const [employees, setEmployees] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch employees data when component mounts
    useEffect(() => {
        async function fetchEmployees() {
            try {
                const response = await fetch('/api/employees');
                const result = await response.json();
                
                // Handle API response
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

    // Show loading state while fetching data
    if (loading) return <Spinner />;
    // Show error message if fetch failed
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Empleados</h1>
            {/* Show message if no employees available */}
            {employees.length === 0 ? (
                <p>No hay empleados disponibles</p>
            ) : (
                <>
                    {/* Display employees in DataTable component */}
                    <DataTable columns={columns} data={employees} />
                    
                    {/* Raw data display (commented out for reference)
                    <div className="space-y-4">
                        {employees.map((employee: any) => (
                            <div key={employee.id} className="border p-4 rounded-lg">
                                <pre>{JSON.stringify(employee, null, 2)}</pre>
                            </div>
                        ))}
                    </div>
                    */}
                </>
            )}
        </div>
    );
} 