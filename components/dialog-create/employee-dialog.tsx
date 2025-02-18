/**
 * Employee Create Dialog Component
 * 
 * Dialog component for creating new employees.
 */

"use client"

import { BaseDialog } from "@/components/dialog/base-dialog"
import { useEmployeeFields } from "@/components/dialog/useEmployeeFields"

export function EmployeeCreateDialog({ onUpdate }: { onUpdate: () => Promise<void> }) {
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