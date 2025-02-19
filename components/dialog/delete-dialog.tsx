/**
 * Generic Delete Dialog Component
 * 
 * A unified dialog component for deleting entities with confirmation.
 * Features:
 * - Type-safe entity handling
 * - Localized entity names and messages
 * - Error handling with toast notifications
 * - Loading state management
 * - Automatic data refresh
 * 
 * Usage:
 * <DeleteDialog
 *   entity={entityData}
 *   entityName="Project"
 *   entityEndpoint="/api/projects"
 *   open={dialogOpen}
 *   onOpenChange={setDialogOpen}
 *   onUpdate={handleUpdate}
 * />
 */

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

/**
 * Props for the DeleteDialog component
 */
interface DeleteDialogProps<T> {
  entity: T                     // The entity to delete
  entityName: string           // Display name of the entity
  entityEndpoint: string       // API endpoint for deletion
  open: boolean               // Dialog open state
  onOpenChange: (open: boolean) => void  // Dialog state handler
  onUpdate: () => Promise<void>  // Callback after successful deletion
}

/**
 * DeleteDialog Component
 * 
 * Renders a confirmation dialog for deleting entities with
 * appropriate warning messages and error handling.
 */
export function DeleteDialog<T extends { id: number }>({
  entity,
  entityName,
  entityEndpoint,
  open,
  onOpenChange,
  onUpdate,
}: DeleteDialogProps<T>) {
  // State Management
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  /**
   * Get localized warning message based on entity type
   */
  const getWarningMessage = () => {
    return `¿Estás seguro de que deseas eliminar ${
      entityName.toLowerCase() === 'actividad' ? 'la' : 'el'
    } ${entityName.toLowerCase()}? Esta acción no se puede deshacer.`
  }

  /**
   * Handle delete action
   * Performs API call and handles success/error states
   */
  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)

    try {
      // Make delete request
      const response = await fetch(`${entityEndpoint}/${entity.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.error || 
          `Error al eliminar ${entityName.toLowerCase()}`
        )
      }

      // Show success notification
      toast({
        title: `${entityName} ${
          entityName.toLowerCase() === 'actividad' ? 
          'eliminada' : 
          'eliminado'
        }`,
        description: `${entityName} se ha eliminado correctamente.`,
      })

      // Close dialog and refresh data
      onOpenChange(false)
      await mutate(entityEndpoint)
      await onUpdate()
    } catch (error) {
      // Handle errors
      const errorMessage = error instanceof Error ? 
        error.message : 
        "Ha ocurrido un error inesperado"
      setError(errorMessage)
      
      // Show error notification
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