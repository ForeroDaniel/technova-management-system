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
import { DeleteDialog } from "@/components/dialog/delete-dialog"
import { EditDialog } from "@/components/dialog/edit-dialog"
import { Activity, Project, Employee } from "@/types"

const entityNamesInSpanish = {
  'Project': 'Proyecto',
  'Employee': 'Empleado',
  'Activity': 'Actividad'
} as const

const entityEndpoints = {
  'Project': '/api/projects',
  'Employee': '/api/employees',
  'Activity': '/api/activities'
} as const

type EntityMap = {
  'Project': Project
  'Employee': Employee
  'Activity': Activity
}

interface ActionCellProps<T extends EntityMap[K], K extends keyof EntityMap> {
  entity: T
  entityName: K
  onUpdate: () => Promise<void>
}

export function ActionCell<T extends EntityMap[K], K extends keyof EntityMap>({ 
  entity,
  entityName,
  onUpdate
}: ActionCellProps<T, K>) {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [localEntity, setLocalEntity] = useState(entity)

  const handleSave = (updatedEntity: T) => {
    setLocalEntity(updatedEntity)
  }

  const entityType = entityName.toLowerCase() as 'project' | 'employee' | 'activity'

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
      <EditDialog
        entityType={entityType}
        entity={localEntity}
        open={editOpen}
        onOpenChange={setEditOpen}
        onUpdate={onUpdate}
      />
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