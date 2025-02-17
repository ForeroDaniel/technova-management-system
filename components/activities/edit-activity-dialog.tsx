"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Activity } from "./columns"

interface EditActivityDialogProps {
  activity: Activity
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (activity: Activity) => void
  onUpdate: () => Promise<void>
}

export function EditActivityDialog({ 
  activity, 
  open, 
  onOpenChange, 
  onSave,
  onUpdate 
}: EditActivityDialogProps) {
  const [editedActivity, setEditedActivity] = useState(activity)

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/activities/${activity.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editedActivity,
          id: activity.id
        }),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update activity');
      }
      
      const { data: updatedActivity } = await response.json();
      onSave(updatedActivity);
      onOpenChange(false);
      await onUpdate();
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Actividad</DialogTitle>
          <DialogDescription>
            Realiza cambios en los datos de la actividad aquí.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="descripcion" className="text-right">Descripción</Label>
            <Input
              id="descripcion"
              value={editedActivity.descripcion}
              onChange={(e) => setEditedActivity({ ...editedActivity, descripcion: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tipo" className="text-right">Tipo</Label>
            <Input
              id="tipo"
              value={editedActivity.tipo}
              onChange={(e) => setEditedActivity({ ...editedActivity, tipo: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="minutos" className="text-right">Minutos</Label>
            <Input
              id="minutos"
              type="number"
              value={editedActivity.minutos}
              onChange={(e) => setEditedActivity({ ...editedActivity, minutos: parseInt(e.target.value) })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="empleado_id" className="text-right">Empleado ID</Label>
            <Input
              id="empleado_id"
              type="number"
              value={editedActivity.empleado_id}
              onChange={(e) => setEditedActivity({ ...editedActivity, empleado_id: parseInt(e.target.value) })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="proyecto_id" className="text-right">Proyecto ID</Label>
            <Input
              id="proyecto_id"
              type="number"
              value={editedActivity.proyecto_id}
              onChange={(e) => setEditedActivity({ ...editedActivity, proyecto_id: parseInt(e.target.value) })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fecha" className="text-right">Fecha</Label>
            <Input
              id="fecha"
              type="date"
              value={editedActivity.fecha.split('T')[0]}
              onChange={(e) => setEditedActivity({ ...editedActivity, fecha: e.target.value })}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 