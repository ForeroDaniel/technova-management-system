/**
 * Activity Create Dialog Component
 * 
 * Dialog component for creating new activities.
 */

"use client"

import { BaseDialog } from "@/components/dialog/base-dialog"
import { useActivityFields } from "@/components/dialog/useActivityFields"
import { useAppDataSWR } from "@/hooks/useApiData"

interface ActivityCreateDialogProps {
  onUpdate: () => Promise<void>
}

export function ActivityCreateDialog({ onUpdate }: ActivityCreateDialogProps) {
  const { refreshData } = useAppDataSWR()
  const activityFields = useActivityFields()

  return (
    <BaseDialog
      mode="create"
      entityName="Actividad"
      entityEndpoint="/api/activities"
      fields={activityFields}
      onUpdate={async () => {
        await refreshData()
        await onUpdate()
      }}
      triggerText="Nueva Actividad"
      title="Crear Actividad"
      description="Añade una nueva actividad al sistema."
      submitText="Crear"
    />
  )
} 