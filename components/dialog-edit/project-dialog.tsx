"use client"

import { BaseDialog } from "@/components/dialog/base-dialog"
import { useProjectFields } from "@/components/dialog/useProjectFields"
import { useAppDataSWR } from "@/hooks/useApiData"
import { Project } from "@/types"

interface ProjectEditDialogProps {
  project: Project
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: () => Promise<void>
}

export function ProjectEditDialog({ project, open, onOpenChange, onUpdate }: ProjectEditDialogProps) {
  const { refreshData } = useAppDataSWR()
  const projectFields = useProjectFields()

  return (
    <BaseDialog
      mode="edit"
      entityName="Proyecto"
      entityEndpoint="/api/projects"
      fields={projectFields}
      entity={project}
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