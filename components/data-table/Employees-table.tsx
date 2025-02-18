'use client';

import { DataTable } from '@/components/data-table/table';
import { columns } from '@/components/data-table/employees-columns';
import { EmployeeCreateDialog } from '@/components/dialog-create/employee-dialog';
import { useAppDataSWR } from '@/hooks/useApiData';

/**
 * Employees Component
 * 
 * Main component for displaying and managing employees.
 * Features:
 * - Uses SWR for data fetching and caching
 * - Displays employees in a filterable and paginated table
 * - Provides loading and error states
 * - Supports employee editing and deletion
 * - Auto-refreshes data after updates
 */
export default function EmployeesTable() {
    const { employees, refreshData } = useAppDataSWR();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Empleados</h1>
            {employees.length === 0 ? (
                <p>No hay empleados disponibles</p>
            ) : (
                <DataTable 
                    data={employees}
                    columns={columns(refreshData)}
                    filterColumn="nombre"
                    filterPlaceholder="Filtrar por nombre..."
                    createButton={<EmployeeCreateDialog onUpdate={refreshData} />}
                    initialSorting={[{ id: "nombre", desc: false }]}
                />
            )}
        </div>
    );
} 