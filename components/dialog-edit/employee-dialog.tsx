"use client"

import { BaseDialog } from "@/components/dialog-edit/base-dialog"
import { Employee } from "@/components/data-table/Employees-columns"

interface EmployeeDialogProps {
  employee: Employee
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (employee: Employee) => void
  onUpdate: () => Promise<void>
}

export function EmployeeDialog({ 
  employee, 
  open, 
  onOpenChange, 
  onSave,
  onUpdate 
}: EmployeeDialogProps) {
  const fields = [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text' as const,
    },
    {
      name: 'correo_electronico',
      label: 'Correo',
      type: 'email' as const,
    },
    {
      name: 'equipo',
      label: 'Equipo',
      type: 'text' as const,
    },
    {
      name: 'costo_por_hora',
      label: 'Costo/Hora',
      type: 'number' as const,
      setValue: (value: string) => parseFloat(value),
    },
  ]

  return (
    <BaseDialog
      entity={employee}
      entityName="Empleado"
      entityEndpoint="/api/employees"
      fields={fields}
      open={open}
      onOpenChange={onOpenChange}
      onSave={onSave}
      onUpdate={onUpdate}
    />
  )
} 