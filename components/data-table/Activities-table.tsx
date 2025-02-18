'use client';

import { DataTable } from '@/components/data-table/table';
import { columns } from '@/components/data-table/activities-columns';
import { ActivityCreateDialog } from '@/components/dialog-create/activity-dialog';
import { useAppDataSWR } from '@/hooks/useApiData';

/**
 * Activities Component
 * 
 * Main component for displaying and managing activities.
 * Features:
 * - Uses SWR for data fetching and caching
 * - Displays activities in a filterable and paginated table
 * - Provides loading and error states
 * - Supports activity editing and deletion
 * - Auto-refreshes data after updates
 */
export default function ActivitiesTable() {
    const { activities, refreshData } = useAppDataSWR();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Actividades</h1>
            {activities.length === 0 ? (
                <p>No hay actividades disponibles</p>
            ) : (
                <DataTable 
                    data={activities}
                    columns={columns(refreshData)}
                    filterColumn="descripcion"
                    filterPlaceholder="Filtrar por descripción..."
                    createButton={<ActivityCreateDialog onUpdate={refreshData} />}
                    initialSorting={[{ id: "fecha", desc: true }]}
                />
            )}
        </div>
    );
}
