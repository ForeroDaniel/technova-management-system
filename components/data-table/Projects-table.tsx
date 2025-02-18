'use client';

import { DataTable } from '@/components/data-table/table';
import { columns } from '@/components/data-table/projects-columns';
import { ProjectCreateDialog } from '@/components/dialog-create/project-dialog';
import { useAppDataSWR } from '@/hooks/useApiData';

/**
 * Projects Component
 * 
 * Main component for displaying and managing projects.
 * Features:
 * - Uses SWR for data fetching and caching
 * - Displays projects in a filterable and paginated table
 * - Provides loading and error states
 * - Supports project editing and deletion
 * - Auto-refreshes data after updates
 */
export default function ProjectsTable() {
    const { projects, refreshData } = useAppDataSWR();

    return (
        <DataTable 
            data={projects}
            columns={columns(refreshData)}
            filterColumn="nombre"
            filterPlaceholder="Filtrar por nombre..."
            createButton={<ProjectCreateDialog onUpdate={refreshData} />}
            initialSorting={[{ id: "fecha_inicio", desc: true }]}
        />
    );
} 