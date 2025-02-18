'use client';

import { DataTableWrapper } from '@/components/data-table/wrapper';
import { columns } from '@/components/data-table/activities-columns';
import { ActivityCreateDialog } from '@/components/dialog-create/activity-dialog';
import { useState } from 'react';

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
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleUpdate = async () => {
        setRefreshTrigger(prev => prev + 1);
        return Promise.resolve();
    };

    return (
        <DataTableWrapper 
            title="Actividades"
            endpoint="/api/activities"
            columns={columns}
            filterColumn="descripcion"
            filterPlaceholder="Filtrar por descripción..."
            emptyMessage="No hay actividades disponibles"
            createButton={<ActivityCreateDialog onUpdate={handleUpdate} />}
            key={refreshTrigger}
            initialSorting={[{ id: "fecha", desc: true }]}
        />
    );
}
