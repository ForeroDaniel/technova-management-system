/**
 * Activity Create Dialog Component
 * 
 * Dialog component for creating new activities.
 */

"use client"

import { BaseDialog } from "@/components/dialog/base-dialog"
import { useActivityFields } from "@/components/dialog/useActivityFields"

export function ActivityCreateDialog({ onUpdate }: { onUpdate: () => Promise<void> }) {
  const fields = useActivityFields()

  return (
    <BaseDialog
      mode="create"
      triggerText="Crear Actividad"
      entityName="Actividad"
      entityEndpoint="/api/activities"
      fields={fields}
      title="Crear Actividad"
      description="Agrega una nueva actividad al sistema."
      submitText="Crear"
      onUpdate={onUpdate}
    />
  )
} 