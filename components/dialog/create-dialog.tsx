/**
 * Generic Create Dialog Component
 * 
 * A unified dialog component for creating new entities (activities, projects, employees).
 */

"use client"

import { BaseDialog } from "@/components/dialog/base-dialog"
import { useActivityFields } from "@/components/dialog/useActivityFields"
import { useProjectFields } from "@/components/dialog/useProjectFields"
import { useEmployeeFields } from "@/components/dialog/useEmployeeFields"
import { useAppDataSWR } from "@/hooks/useApiData"

type EntityType = 'activity' | 'project' | 'employee'

interface CreateDialogProps {
  entityType: EntityType
  onUpdate: () => Promise<void>
}

export function CreateDialog({ entityType, onUpdate }: CreateDialogProps) {
  const { refreshData } = useAppDataSWR()

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