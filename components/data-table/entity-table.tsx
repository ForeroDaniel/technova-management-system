/**
 * Generic Entity Table Component
 * 
 * A unified table component for displaying entities (activities, projects, employees).
 * Features:
 * - Dynamic column configuration based on entity type
 * - Customizable filtering and sorting
 * - Create dialog integration
 * - Empty state handling
 * - Automatic data refresh after updates
 * 
 * Usage:
 * <EntityTable entityType="activities|projects|employees" />
 */

"use client"

import { DataTable } from '@/components/data-table/table'
import { columns as projectColumns } from './projects-columns'
import { columns as employeeColumns } from './employees-columns'
import { columns as activityColumns } from './activities-columns'
import { CreateDialog } from '@/components/dialog/create-dialog'
import { useAppDataSWR } from '@/hooks/useApiData'
import { EntityTypePlural, EntityTypeSingular, Activity, Project, Employee } from '@/types'
import { Spinner } from '@/components/ui/spinner'
import { ColumnDef } from '@tanstack/react-table'

/**
 * Configuration type for each entity
 * Defines how the table should behave for different entity types
 */
type EntityConfig<T> = {
    title: string                   // Display title
    filterColumn: string           // Column to filter by
    filterPlaceholder: string      // Filter input placeholder
    initialSorting: {              // Default sorting configuration
        id: string
        desc: boolean
    }[]
    getColumns: (onUpdate: () => Promise<void>) => ColumnDef<T>[]  // Column definitions
    getData: (data: ReturnType<typeof useAppDataSWR>) => T[]  // Data selector
    createEntityType: EntityTypeSingular  // Type for create dialog
}

/**
 * Configuration for each entity type
 * Defines specific behavior and display options
 */
const entityConfigs: {
    activities: EntityConfig<Activity>
    projects: EntityConfig<Project>
    employees: EntityConfig<Employee>
} = {
    // Activities configuration
    activities: {
        title: 'Actividades',
        filterColumn: 'descripcion',
        filterPlaceholder: 'Filtrar por descripción...',
        initialSorting: [{ id: 'fecha', desc: true }],
        getColumns: activityColumns,
        getData: (data) => data.activities,
        createEntityType: 'activity'
    },
    // Projects configuration
    projects: {
        title: 'Proyectos',
        filterColumn: 'nombre',
        filterPlaceholder: 'Filtrar por nombre...',
        initialSorting: [{ id: 'fecha_inicio', desc: true }],
        getColumns: projectColumns,
        getData: (data) => data.projects,
        createEntityType: 'project'
    },
    // Employees configuration
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

// Component props type
interface EntityTableProps {
    entityType: EntityTypePlural
}

/**
 * EntityTable Component
 * 
 * Renders a data table for the specified entity type with appropriate
 * configuration and behavior.
 */
export default function EntityTable({ entityType }: EntityTableProps) {
    // Get data and utilities from the app data hook
    const appData = useAppDataSWR()
    // Get configuration for the specified entity type
    const { refreshData, isLoading } = appData
    const config = entityConfigs[entityType]

    // Get data and columns with proper typing based on entity type
    const data = config.getData(appData)
    const columns = config.getColumns(refreshData)

    // Type assertion helper based on entity type
    type EntityTypeMap = {
        'activities': Activity
        'projects': Project
        'employees': Employee
    }
    type CurrentEntity = EntityTypeMap[typeof entityType]

    return (
        <div className="p-4">
            {/* Table title */}
            <h1 className="text-2xl font-bold mb-4">{config.title}</h1>
             {/* Show empty state or data table */}
            {isLoading ? (
                <Spinner className="min-h-[400px]" />
            ) : data.length === 0 ? (
                <p>No hay {config.title.toLowerCase()} disponibles</p>
            ) : (
                <DataTable<CurrentEntity, unknown>
                    data={data as CurrentEntity[]}
                    columns={columns as ColumnDef<CurrentEntity>[]}
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