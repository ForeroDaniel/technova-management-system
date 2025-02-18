"use client"

import { BaseDialog } from "@/components/dialog/base-dialog"
import { Project } from "@/components/data-table/projects-columns"
import { useProjectFields } from "@/components/dialog/useProjectFields"

interface ProjectDialogProps {
  project: Project
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (project: Project) => void
  onUpdate: () => Promise<void>
}

export function ProjectDialog({ 
  project, 
  open, 
  onOpenChange, 
  onSave,
  onUpdate 
}: ProjectDialogProps) {
  const fields = useProjectFields(project)

  return (
    <BaseDialog
      mode="edit"
      entity={project}
      entityName="Proyecto"
      entityEndpoint="/api/projects"
      fields={fields}
      open={open}
      onOpenChange={onOpenChange}
      onSave={onSave}
      onUpdate={onUpdate}
    />
  )
} 