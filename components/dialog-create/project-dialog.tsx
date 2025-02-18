/**
 * Project Create Dialog Component
 * 
 * Dialog component for creating new projects.
 */

"use client"

import { BaseDialog } from "@/components/dialog/base-dialog"
import { useProjectFields } from "@/components/dialog/useProjectFields"
import { useAppDataSWR } from "@/hooks/useApiData"

interface ProjectCreateDialogProps {
  onUpdate: () => Promise<void>
}

export function ProjectCreateDialog({ onUpdate }: ProjectCreateDialogProps) {
  const { refreshData } = useAppDataSWR()
  const fields = useProjectFields()

  return (
    <BaseDialog
      mode="create"
      triggerText="Crear Proyecto"
      entityName="Proyecto"
      entityEndpoint="/api/projects"
      fields={fields}
      title="Crear Proyecto"
      description="Agrega un nuevo proyecto al sistema."
      submitText="Crear"
      onUpdate={onUpdate}
    />
  )
} 