"use client"

import { BaseDialog } from "@/components/dialog/base-dialog"
import { useActivityFields } from "@/components/dialog/useActivityFields"
import { useAppDataSWR } from "@/hooks/useApiData"
import { Activity } from "@/types"

interface ActivityEditDialogProps {
  activity: Activity
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: () => Promise<void>
}

export function ActivityEditDialog({ activity, open, onOpenChange, onUpdate }: ActivityEditDialogProps) {
  const { refreshData } = useAppDataSWR()
  const activityFields = useActivityFields()

  return (
    <BaseDialog
      mode="edit"
      entityName="Actividad"
      entityEndpoint="/api/activities"
      fields={activityFields}
      entity={activity}
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