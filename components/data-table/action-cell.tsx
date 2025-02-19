/**
 * ActionCell Component
 * 
 * A reusable dropdown menu component for table row actions:
 * - Edit action with dialog
 * - Delete action with confirmation dialog
 * - Type-safe entity handling
 * 
 * Features:
 * - Generic type support for different entities
 * - Localized entity names
 * - Centralized API endpoint mapping
 * - State management for dialogs
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
import { DeleteDialog } from "@/components/dialog/delete-dialog"
import { EditDialog } from "@/components/dialog/edit-dialog"
import { Activity, Project, Employee } from "@/types"

/**
 * Spanish translations for entity names
 */
const entityNamesInSpanish = {
  'Project': 'Proyecto',
  'Employee': 'Empleado',
  'Activity': 'Actividad'
} as const

/**
 * API endpoint mapping for each entity type
 */
const entityEndpoints = {
  'Project': '/api/projects',
  'Employee': '/api/employees',
  'Activity': '/api/activities'
} as const

/**
 * Type mapping for entities to ensure type safety
 */
type EntityMap = {
  'Project': Project
  'Employee': Employee
  'Activity': Activity
}

/**
 * Props definition for the ActionCell component
 */
interface ActionCellProps<T extends EntityMap[K], K extends keyof EntityMap> {
  entity: T                    // The entity data
  entityName: K               // The entity type name
  onUpdate: () => Promise<void> // Callback after successful action
}

/**
 * ActionCell Component
 * 
 * Renders a dropdown menu with edit and delete actions for a table row.
 * Handles dialog state and entity updates.
 */
export function ActionCell<T extends EntityMap[K], K extends keyof EntityMap>({ 
  entity,
  entityName,
  onUpdate
}: ActionCellProps<T, K>) {
  // Dialog state management
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [localEntity, setLocalEntity] = useState(entity)

  // Handle entity updates
  const handleSave = (updatedEntity: T) => {
    setLocalEntity(updatedEntity)
  }

  // Convert entity name to type for dialog props
  const entityType = entityName.toLowerCase() as 'project' | 'employee' | 'activity'

  return (
    <div className="text-right">
      {/* Dropdown menu trigger */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        {/* Dropdown menu items */}
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setDeleteOpen(true)}
            className="text-destructive focus:text-destructive"
          >
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit dialog */}
      <EditDialog
        entityType={entityType}
        entity={localEntity}
        open={editOpen}
        onOpenChange={setEditOpen}
        onUpdate={onUpdate}
      />

      {/* Delete confirmation dialog */}
      <DeleteDialog
        entity={localEntity}
        entityName={entityNamesInSpanish[entityName]}
        entityEndpoint={entityEndpoints[entityName]}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onUpdate={onUpdate}
      />
    </div>
  )
} 