/**
 * Generic Edit Dialog Component
 * 
 * A unified dialog component for editing entities (activities, projects, employees).
 * Features:
 * - Type-safe entity handling
 * - Dynamic field configuration
 * - Automatic data refresh
 * - Localized text content
 * - Reusable form structure
 * 
 * Usage:
 * <EditDialog
 *   entityType="activity|project|employee"
 *   entity={entityData}
 *   open={dialogOpen}
 *   onOpenChange={setDialogOpen}
 *   onUpdate={handleUpdate}
 * />
 */

"use client"

import { BaseDialog } from "@/components/dialog/base-dialog"
import { useActivityFields } from "@/hooks/form-validation/useActivityFields"
import { useProjectFields } from "@/hooks/form-validation/useProjectFields"
import { useEmployeeFields } from "@/hooks/form-validation/useEmployeeFields"
import { useAppDataSWR } from "@/hooks/useApiData"
import { Activity, Project, Employee } from "@/types"

/**
 * Type mapping for entities to ensure type safety
 */
type EntityMap = {
    activity: Activity
    project: Project
    employee: Employee
}

/**
 * Props definition for the EditDialog component
 */
interface EditDialogProps<T extends keyof EntityMap> {
    entityType: T                    // Type of entity being edited
    entity: EntityMap[T]            // The entity data
    open: boolean                   // Dialog open state
    onOpenChange: (open: boolean) => void  // Dialog state handler
    onUpdate: () => Promise<void>   // Callback after successful edit
}

/**
 * EditDialog Component
 * 
 * Renders a dialog for editing existing entities with appropriate fields
 * and validation based on the entity type.
 */
export function EditDialog<T extends keyof EntityMap>({ 
    entityType, 
    entity, 
    open, 
    onOpenChange, 
    onUpdate 
}: EditDialogProps<T>) {
    const { refreshData } = useAppDataSWR()

    // Move hook calls to the component level
    const activityFields = useActivityFields()
    const projectFields = useProjectFields()
    const employeeFields = useEmployeeFields()

    // Get configuration for the specified entity type
    const config = (() => {
        switch (entityType) {
            case 'activity':
                return {
                    fields: activityFields,
                    endpoint: '/api/activities',
                    name: 'Actividad'
                }
            case 'project':
                return {
                    fields: projectFields,
                    endpoint: '/api/projects',
                    name: 'Proyecto'
                }
            case 'employee':
                return {
                    fields: employeeFields,
                    endpoint: '/api/employees',
                    name: 'Empleado'
                }
            default: {
                throw new Error(`Unsupported entity type: ${entityType}`)
            }
        }
    })()

    return (
        <BaseDialog
            mode="edit"
            entityName={config.name}
            entityEndpoint={config.endpoint}
            fields={config.fields}
            entity={entity}
            open={open}
            onOpenChange={onOpenChange}
            onUpdate={async () => {
                await refreshData()
                await onUpdate()
            }}
            onSave={() => {}}
        />
    )
} 