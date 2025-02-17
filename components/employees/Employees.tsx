'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
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
 * - Supports employee editing and deletion
 * - Auto-refreshes data after updates
 */
export default function Employees() {
    // State management for employees data, loading state, and errors
    const [employees, setEmployees] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Function to fetch employees data
    const fetchEmployees = async () => {
        try {
            const response = await fetch('/api/employees');
            const result = await response.json();
            
            // Handle API response
            if (result.error) {
                setError(result.error);
            } else {
                // Sort employees by ID by default
                const sortedEmployees = result.data.sort((a: any, b: any) => a.id - b.id);
                setEmployees(sortedEmployees);
            }
        } catch (err) {
            setError('Error fetching employees');
        } finally {
            setLoading(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
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
                <DataTable 
                    columns={columns(fetchEmployees)} 
                    data={employees}
                    filterColumn="nombre"
                    filterPlaceholder="Filtrar por nombre..."
                />
            )}
        </div>
    );
} 