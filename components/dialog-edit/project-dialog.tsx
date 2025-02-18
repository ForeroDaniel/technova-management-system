"use client"

import { BaseDialog } from "@/components/dialog-edit/base-dialog"
import { Project } from "@/components/data-table/Projects-columns"

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
  const fields = [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text' as const,
    },
    {
      name: 'compania',
      label: 'Compañía',
      type: 'text' as const,
    },
    {
      name: 'presupuesto',
      label: 'Presupuesto',
      type: 'number' as const,
      setValue: (value: string) => parseFloat(value),
    },
    {
      name: 'fecha_inicio',
      label: 'Fecha Inicio',
      type: 'date' as const,
      getValue: (value: string) => value.split('T')[0],
    },
    {
      name: 'fecha_fin',
      label: 'Fecha Fin',
      type: 'date' as const,
      getValue: (value: string) => value.split('T')[0],
    },
  ]

  return (
    <BaseDialog
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