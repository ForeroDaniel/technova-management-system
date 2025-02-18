"use client"

import { BaseDialog } from "@/components/dialog/base-dialog"
import { Employee } from "@/components/data-table/employees-columns"
import { useEmployeeFields } from "@/components/dialog/useEmployeeFields"

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
  const fields = useEmployeeFields()

  return (
    <BaseDialog
      mode="edit"
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