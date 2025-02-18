'use client';

import { DataTableWrapper } from '@/components/data-table/wrapper';
import { columns } from '@/components/data-table/Employees-columns';

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
    return (
        <DataTableWrapper 
            title="Empleados"
            endpoint="/api/employees"
            columns={columns}
            filterColumn="nombre"
            filterPlaceholder="Filtrar por nombre..."
            emptyMessage="No hay empleados disponibles"
        />
    );
} 