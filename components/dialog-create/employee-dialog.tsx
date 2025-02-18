/**
 * Employee Create Dialog Component
 * 
 * Dialog component for creating new employees.
 */

"use client"

import { BaseDialog } from "@/components/dialog/base-dialog"
import { useEmployeeFields } from "@/components/dialog/useEmployeeFields"
import { useAppDataSWR } from "@/hooks/useApiData"

interface EmployeeCreateDialogProps {
  onUpdate: () => Promise<void>
}

export function EmployeeCreateDialog({ onUpdate }: EmployeeCreateDialogProps) {
  const { refreshData } = useAppDataSWR()
  const fields = useEmployeeFields()

  return (
    <BaseDialog
      mode="create"
      triggerText="Crear Empleado"
      entityName="Empleado"
      entityEndpoint="/api/employees"
      fields={fields}
      title="Crear Empleado"
      description="Agrega un nuevo empleado al sistema."
      submitText="Crear"
      onUpdate={onUpdate}
    />
  )
} 