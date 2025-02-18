/**
 * Generic Edit Dialog Component
 * 
 * A unified dialog component for editing entities (activities, projects, employees).
 */

"use client"

import { BaseDialog } from "@/components/dialog/base-dialog"
import { useActivityFields } from "@/components/dialog/useActivityFields"
import { useProjectFields } from "@/components/dialog/useProjectFields"
import { useEmployeeFields } from "@/components/dialog/useEmployeeFields"
import { useAppDataSWR } from "@/hooks/useApiData"
import { Activity, Project, Employee } from "@/types"

type EntityType = 'activity' | 'project' | 'employee'

type EntityMap = {
  activity: Activity
  project: Project
  employee: Employee
}

interface EditDialogProps<T extends EntityType> {
  entityType: T
  entity: EntityMap[T]
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: () => Promise<void>
}

export function EditDialog<T extends EntityType>({ 
  entityType, 
  entity, 
  open, 
  onOpenChange, 
  onUpdate 
}: EditDialogProps<T>) {
  const { refreshData } = useAppDataSWR()

  const getEntityConfig = () => {
    switch (entityType) {
      case 'activity':
        return {
          fields: useActivityFields(),
          endpoint: '/api/activities',
          name: 'Actividad'
        }
      case 'project':
        return {
          fields: useProjectFields(),
          endpoint: '/api/projects',
          name: 'Proyecto'
        }
      case 'employee':
        return {
          fields: useEmployeeFields(),
          endpoint: '/api/employees',
          name: 'Empleado'
        }
      default: {
        const _exhaustiveCheck: never = entityType
        throw new Error(`Unsupported entity type: ${_exhaustiveCheck}`)
      }
    }
  }

  const config = getEntityConfig()

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