"use client"

import { BaseDialog } from "@/components/dialog/base-dialog"
import { useEmployeeFields } from "@/components/dialog/useEmployeeFields"
import { useAppDataSWR } from "@/hooks/useApiData"
import { Employee } from "@/types"

interface EmployeeEditDialogProps {
  employee: Employee
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: () => Promise<void>
}

export function EmployeeEditDialog({ employee, open, onOpenChange, onUpdate }: EmployeeEditDialogProps) {
  const { refreshData } = useAppDataSWR()
  const employeeFields = useEmployeeFields()

  return (
    <BaseDialog
      mode="edit"
      entityName="Empleado"
      entityEndpoint="/api/employees"
      fields={employeeFields}
      entity={employee}
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