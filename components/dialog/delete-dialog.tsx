"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { mutate } from "swr"

interface DeleteDialogProps<T> {
  entity: T
  entityName: string
  entityEndpoint: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: () => Promise<void>
}

export function DeleteDialog<T extends { id: number }>({
  entity,
  entityName,
  entityEndpoint,
  open,
  onOpenChange,
  onUpdate,
}: DeleteDialogProps<T>) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      setError(null)
      const response = await fetch(`${entityEndpoint}/${entity.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error al eliminar ${entityName.toLowerCase()}`)
      }

      onOpenChange(false)
      await mutate(entityEndpoint)
      await onUpdate()
    } catch (error) {
      console.error(`Error al eliminar ${entityName.toLowerCase()}:`, error)
      setError((error as Error).message)
    } finally {
      setIsDeleting(false)
    }
  }

  const getWarningMessage = () => {
    switch (entityName.toLowerCase()) {
      case 'proyecto':
        return '¿Estás seguro de que deseas eliminar este proyecto? Se eliminarán también todas las actividades asociadas a este proyecto. Esta acción no se puede deshacer.'
      case 'empleado':
        return '¿Estás seguro de que deseas eliminar este empleado? Se eliminarán también todas las actividades registradas por este empleado. Esta acción no se puede deshacer.'
      case 'actividad':
        return '¿Estás seguro de que deseas eliminar esta actividad? Esta acción no se puede deshacer.'
      default:
        return '¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar {entityName}</DialogTitle>
          <DialogDescription>
            {getWarningMessage()}
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="text-sm font-medium text-destructive">
            {error}
          </div>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 