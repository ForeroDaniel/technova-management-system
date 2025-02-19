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
import { useToast } from "@/hooks/use-toast"

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
  const { toast } = useToast()

  const getWarningMessage = () => {
    return `¿Estás seguro de que deseas eliminar ${entityName.toLowerCase() === 'actividad' ? 'la' : 'el'} ${entityName.toLowerCase()}? Esta acción no se puede deshacer.`
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)

    try {
      const response = await fetch(`${entityEndpoint}/${entity.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error al eliminar ${entityName.toLowerCase()}`)
      }

      // Show success toast
      toast({
        title: `${entityName} ${entityName.toLowerCase() === 'actividad' ? 'eliminada' : 'eliminado'}`,
        description: `${entityName} se ha eliminado correctamente.`,
      })

      onOpenChange(false)
      await mutate(entityEndpoint)
      await onUpdate()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ha ocurrido un error inesperado"
      setError(errorMessage)
      // Show error toast
      toast({
        variant: "destructive",
        title: `Error al eliminar ${entityName.toLowerCase()}`,
        description: errorMessage,
      })
    } finally {
      setIsDeleting(false)
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