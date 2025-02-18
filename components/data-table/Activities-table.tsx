'use client';

import { DataTableWrapper } from '@/components/data-table/wrapper';
import { columns } from '@/components/data-table/Activities-columns';

/**
 * Activities Component
 * 
 * Main component for displaying and managing activities.
 * Features:
 * - Fetches activity data from API
 * - Displays activities in a filterable and paginated table
 * - Provides loading and error states
 * - Supports activity editing and deletion
 * - Auto-refreshes data after updates
 */
export default function ActivitiesTable() {
    return (
        <DataTableWrapper 
            title="Actividades"
            endpoint="/api/activities"
            columns={columns}
            filterColumn="descripcion"
            filterPlaceholder="Filtrar por descripción..."
            emptyMessage="No hay actividades disponibles"
        />
    );
}
