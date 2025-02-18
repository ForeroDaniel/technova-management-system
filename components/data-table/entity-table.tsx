/**
 * Generic Entity Table Component
 * 
 * A unified table component for displaying entities (activities, projects, employees).
 * Features:
 * - Uses SWR for data fetching and caching
 * - Displays entities in a filterable and paginated table
 * - Provides loading and error states
 * - Supports entity editing and deletion
 * - Auto-refreshes data after updates
 */

"use client"

import { DataTable } from '@/components/data-table/table'
import { columns as projectColumns } from '@/components/data-table/projects-columns'
import { columns as employeeColumns } from '@/components/data-table/employees-columns'
import { columns as activityColumns } from '@/components/data-table/activities-columns'
import { CreateDialog } from '@/components/dialog/create-dialog'
import { useAppDataSWR } from '@/hooks/useApiData'
import { Activity, Project, Employee } from '@/types'

type EntityType = 'activities' | 'projects' | 'employees'

type EntityConfig = {
  title: string
  filterColumn: string
  filterPlaceholder: string
  initialSorting: { id: string; desc: boolean }[]
  getColumns: (onUpdate: () => Promise<void>) => any
  getData: (data: ReturnType<typeof useAppDataSWR>) => any[]
  createEntityType: 'activity' | 'project' | 'employee'
}

const entityConfigs: Record<EntityType, EntityConfig> = {
  activities: {
    title: 'Actividades',
    filterColumn: 'descripcion',
    filterPlaceholder: 'Filtrar por descripción...',
    initialSorting: [{ id: 'fecha', desc: true }],
    getColumns: activityColumns,
    getData: (data) => data.activities,
    createEntityType: 'activity'
  },
  projects: {
    title: 'Proyectos',
    filterColumn: 'nombre',
    filterPlaceholder: 'Filtrar por nombre...',
    initialSorting: [{ id: 'fecha_inicio', desc: true }],
    getColumns: projectColumns,
    getData: (data) => data.projects,
    createEntityType: 'project'
  },
  employees: {
    title: 'Empleados',
    filterColumn: 'nombre',
    filterPlaceholder: 'Filtrar por nombre...',
    initialSorting: [{ id: 'nombre', desc: false }],
    getColumns: employeeColumns,
    getData: (data) => data.employees,
    createEntityType: 'employee'
  }
}

interface EntityTableProps {
  entityType: EntityType
}

export default function EntityTable({ entityType }: EntityTableProps) {
  const appData = useAppDataSWR()
  const { refreshData } = appData
  const config = entityConfigs[entityType]
  const data = config.getData(appData)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{config.title}</h1>
      {data.length === 0 ? (
        <p>No hay {config.title.toLowerCase()} disponibles</p>
      ) : (
        <DataTable
          data={data}
          columns={config.getColumns(refreshData)}
          filterColumn={config.filterColumn}
          filterPlaceholder={config.filterPlaceholder}
          createButton={
            <CreateDialog
              entityType={config.createEntityType}
              onUpdate={refreshData}
            />
          }
          initialSorting={config.initialSorting}
        />
      )}
    </div>
  )
} 