/**
 * Generic Create Dialog Component
 * 
 * A unified dialog component for creating new entities (activities, projects, employees).
 * Features:
 * - Type-safe entity handling
 * - Dynamic field configuration
 * - Automatic data refresh
 * - Localized text content
 * - Reusable form structure
 */

"use client"

import { BaseDialog } from "@/components/dialog/base-dialog"
import { useActivityFields } from "@/hooks/form-validation/useActivityFields"
import { useProjectFields } from "@/hooks/form-validation/useProjectFields"
import { useEmployeeFields } from "@/hooks/form-validation/useEmployeeFields"
import { useAppDataSWR } from "@/hooks/useApiData"
import { EntityTypeSingular } from "@/types"

/**
 * Props for the CreateDialog component
 */
interface CreateDialogProps {
    entityType: EntityTypeSingular
    onUpdate: () => Promise<void>
}

/**
 * CreateDialog Component
 * 
 * Renders a dialog for creating new entities with appropriate fields
 * and validation based on the entity type.
 */
export function CreateDialog({ entityType, onUpdate }: CreateDialogProps) {
    const { refreshData } = useAppDataSWR()

    /**
     * Get configuration for the specified entity type
     * Returns fields, endpoint, and text content
     */
    const getEntityConfig = () => {
        switch (entityType) {
            case 'activity':
                return {
                    fields: useActivityFields(),
                    endpoint: '/api/activities',
                    name: 'Actividad',
                    triggerText: 'Registrar Actividad',
                    title: 'Registrar Actividad',
                    description: 'Añade una nueva actividad para un proyecto.'
                }
            case 'project':
                return {
                    fields: useProjectFields(),
                    endpoint: '/api/projects',
                    name: 'Proyecto',
                    triggerText: 'Crear Proyecto',
                    title: 'Crear Proyecto',
                    description: 'Agrega un nuevo proyecto al sistema.'
                }
            case 'employee':
                return {
                    fields: useEmployeeFields(),
                    endpoint: '/api/employees',
                    name: 'Empleado',
                    triggerText: 'Crear Empleado',
                    title: 'Crear Empleado',
                    description: 'Agrega un nuevo empleado al sistema.'
                }
        }
    }

    const config = getEntityConfig()

    return (
        <BaseDialog
            mode="create"
            entityName={config.name}
            entityEndpoint={config.endpoint}
            fields={config.fields}
            onUpdate={async () => {
                await refreshData()
                await onUpdate()
            }}
            triggerText={config.triggerText}
            title={config.title}
            description={config.description}
            submitText="Crear"
        />
    )
} 