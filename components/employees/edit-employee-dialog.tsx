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
import { Employee } from "./columns"

interface EditEmployeeDialogProps {
  employee: Employee
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (employee: Employee) => void
  onUpdate: () => Promise<void>
}

export function EditEmployeeDialog({ 
  employee, 
  open, 
  onOpenChange, 
  onSave,
  onUpdate 
}: EditEmployeeDialogProps) {
  const [editedEmployee, setEditedEmployee] = useState(employee)

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/employees/${employee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editedEmployee,
          id: employee.id
        }),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update employee');
      }
      
      const { data: updatedEmployee } = await response.json();
      onSave(updatedEmployee);
      onOpenChange(false);
      await onUpdate();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Empleado</DialogTitle>
          <DialogDescription>
            Realiza cambios en los datos del empleado aquí.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nombre" className="text-right">Nombre</Label>
            <Input
              id="nombre"
              value={editedEmployee.nombre}
              onChange={(e) => setEditedEmployee({ ...editedEmployee, nombre: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="correo" className="text-right">Correo</Label>
            <Input
              id="correo"
              value={editedEmployee.correo_electronico}
              onChange={(e) => setEditedEmployee({ ...editedEmployee, correo_electronico: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="equipo" className="text-right">Equipo</Label>
            <Input
              id="equipo"
              value={editedEmployee.equipo}
              onChange={(e) => setEditedEmployee({ ...editedEmployee, equipo: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="costo" className="text-right">Costo/Hora</Label>
            <Input
              id="costo"
              type="number"
              value={editedEmployee.costo_por_hora}
              onChange={(e) => setEditedEmployee({ ...editedEmployee, costo_por_hora: parseFloat(e.target.value) })}
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