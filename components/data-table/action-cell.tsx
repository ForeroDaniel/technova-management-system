/**
 * Action Cell Component
 * 
 * A reusable component for table action cells that provides:
 * - Dropdown menu for row actions (edit/delete)
 * - Integration with entity-specific edit dialogs
 * - State management for dialog visibility
 * - Consistent UI across all entity tables
 * 
 * @template T - Entity type, must include an 'id' field
 */

"use client"

import { useState } from "react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ActionCellProps<T> {
  entity: T
  entityName: 'Project' | 'Employee' | 'Activity'
  EditDialog: React.ComponentType<any>
  onUpdate: () => Promise<void>
}

export function ActionCell<T extends { id: number }>({ 
  entity,
  entityName,
  EditDialog,
  onUpdate
}: ActionCellProps<T>) {
  const [open, setOpen] = useState(false)
  const [localEntity, setLocalEntity] = useState(entity)

  const handleSave = (updatedEntity: T) => {
    setLocalEntity(updatedEntity)
  }

  const dialogProps = {
    open,
    onOpenChange: setOpen,
    onSave: handleSave,
    onUpdate,
    [entityName.toLowerCase()]: localEntity
  }

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem>
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditDialog {...dialogProps} />
    </div>
  )
} 