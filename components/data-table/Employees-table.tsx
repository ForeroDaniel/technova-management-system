'use client';

import { DataTableWrapper } from '@/components/data-table/wrapper';
import { columns } from '@/components/data-table/employees-columns';
import { EmployeeCreateDialog } from '@/components/dialog-create/employee-dialog';
import { useState } from 'react';

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
export default function EmployeesTable() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleUpdate = async () => {
        setRefreshTrigger(prev => prev + 1);
        return Promise.resolve();
    };

    return (
        <DataTableWrapper 
            title="Empleados"
            endpoint="/api/employees"
            columns={columns}
            filterColumn="nombre"
            filterPlaceholder="Filtrar por nombre..."
            emptyMessage="No hay empleados disponibles"
            createButton={<EmployeeCreateDialog onUpdate={handleUpdate} />}
            key={refreshTrigger}
            initialSorting={[{ id: "nombre", desc: false }]}
        />
    );
} 