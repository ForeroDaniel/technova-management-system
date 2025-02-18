/**
 * Base Dialog Component
 * 
 * Core dialog component that provides the foundation for entity-specific dialogs
 * with common structure and styling.
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export interface Field {
  name: string
  label: string
  type: 'text' | 'number' | 'date' | 'email'
  getValue?: (value: any) => any
  setValue?: (value: any) => any
}

export interface BaseDialogProps<T> {
  entity: T
  entityName: string
  entityEndpoint: string
  fields: Field[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (entity: T) => void
  onUpdate: () => Promise<void>
}

export function BaseDialog<T extends { id: number }>({ 
  entity,
  entityName,
  entityEndpoint,
  fields,
  open, 
  onOpenChange, 
  onSave,
  onUpdate 
}: BaseDialogProps<T>) {
  const [editedEntity, setEditedEntity] = useState(entity)

  const handleSave = async () => {
    try {
      const response = await fetch(`${entityEndpoint}/${entity.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editedEntity,
          id: entity.id
        }),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to update ${entityName.toLowerCase()}`);
      }
      
      const { data: updatedEntity } = await response.json();
      onSave(updatedEntity);
      onOpenChange(false);
      await onUpdate();
    } catch (error) {
      console.error(`Error updating ${entityName.toLowerCase()}:`, error);
    }
  }

  const handleFieldChange = (field: Field, value: any) => {
    const processedValue = field.setValue ? field.setValue(value) : value;
    setEditedEntity({ ...editedEntity, [field.name]: processedValue });
  }

  const getFieldValue = (field: Field) => {
    const rawValue = (editedEntity as any)[field.name];
    return field.getValue ? field.getValue(rawValue) : rawValue;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar {entityName}</DialogTitle>
          <DialogDescription>
            Realiza cambios en los datos del {entityName.toLowerCase()} aquí.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field) => (
            <div key={field.name} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field.name} className="text-right">{field.label}</Label>
              <Input
                id={field.name}
                type={field.type}
                value={getFieldValue(field)}
                onChange={(e) => handleFieldChange(field, e.target.value)}
                className="col-span-3"
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 