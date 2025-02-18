'use client';

import { DataTableWrapper } from '@/components/data-table/wrapper';
import { columns } from '@/components/data-table/Projects-columns';

/**
 * Projects Component
 * 
 * Main component for displaying and managing projects.
 * Features:
 * - Fetches project data from API
 * - Displays projects in a filterable and paginated table
 * - Provides loading and error states
 * - Supports project editing and deletion
 * - Auto-refreshes data after updates
 */
export default function ProjectsTable() {
    return (
        <DataTableWrapper 
            title="Proyectos"
            endpoint="/api/projects"
            columns={columns}
            filterColumn="nombre"
            filterPlaceholder="Filtrar por nombre..."
            emptyMessage="No hay proyectos disponibles"
        />
    );
} 