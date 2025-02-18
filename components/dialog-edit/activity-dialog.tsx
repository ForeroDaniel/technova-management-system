"use client"

import { Activity } from "@/components/data-table/activities-columns"
import { BaseDialog } from "@/components/dialog/base-dialog"
import { useActivityFields } from "@/components/dialog/useActivityFields"

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
  const fields = useActivityFields(activity)

  return (
    <BaseDialog
      mode="edit"
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