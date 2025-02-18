"use client"

import { BaseDialog } from "@/components/dialog-edit/base-dialog"
import { Activity } from "@/components/data-table/Activities-columns"

interface ActivityDialogProps {
  activity: Activity
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (activity: Activity) => void
  onUpdate: () => Promise<void>
}

export function ActivityDialog({ 
  activity, 
  open, 
  onOpenChange, 
  onSave,
  onUpdate 
}: ActivityDialogProps) {
  const fields = [
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'text' as const,
    },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'text' as const,
    },
    {
      name: 'minutos',
      label: 'Minutos',
      type: 'number' as const,
      setValue: (value: string) => parseInt(value),
    },
    {
      name: 'empleado_id',
      label: 'Empleado ID',
      type: 'number' as const,
      setValue: (value: string) => parseInt(value),
    },
    {
      name: 'proyecto_id',
      label: 'Proyecto ID',
      type: 'number' as const,
      setValue: (value: string) => parseInt(value),
    },
    {
      name: 'fecha',
      label: 'Fecha',
      type: 'date' as const,
      getValue: (value: string) => value.split('T')[0],
    },
  ]

  return (
    <BaseDialog
      entity={activity}
      entityName="Actividad"
      entityEndpoint="/api/activities"
      fields={fields}
      open={open}
      onOpenChange={onOpenChange}
      onSave={onSave}
      onUpdate={onUpdate}
    />
  )
} 