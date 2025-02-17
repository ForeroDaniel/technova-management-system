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
import { Project } from "./columns"

interface EditProjectDialogProps {
  project: Project
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (project: Project) => void
  onUpdate: () => Promise<void>
}

export function EditProjectDialog({ 
  project, 
  open, 
  onOpenChange, 
  onSave,
  onUpdate 
}: EditProjectDialogProps) {
  const [editedProject, setEditedProject] = useState(project)

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editedProject,
          id: project.id
        }),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update project');
      }
      
      const { data: updatedProject } = await response.json();
      onSave(updatedProject);
      onOpenChange(false);
      await onUpdate();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Proyecto</DialogTitle>
          <DialogDescription>
            Realiza cambios en los datos del proyecto aquí.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nombre" className="text-right">Nombre</Label>
            <Input
              id="nombre"
              value={editedProject.nombre}
              onChange={(e) => setEditedProject({ ...editedProject, nombre: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="compania" className="text-right">Compañía</Label>
            <Input
              id="compania"
              value={editedProject.compania}
              onChange={(e) => setEditedProject({ ...editedProject, compania: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="presupuesto" className="text-right">Presupuesto</Label>
            <Input
              id="presupuesto"
              type="number"
              value={editedProject.presupuesto}
              onChange={(e) => setEditedProject({ ...editedProject, presupuesto: parseFloat(e.target.value) })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fecha_inicio" className="text-right">Fecha Inicio</Label>
            <Input
              id="fecha_inicio"
              type="date"
              value={editedProject.fecha_inicio.split('T')[0]}
              onChange={(e) => setEditedProject({ ...editedProject, fecha_inicio: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fecha_fin" className="text-right">Fecha Fin</Label>
            <Input
              id="fecha_fin"
              type="date"
              value={editedProject.fecha_fin.split('T')[0]}
              onChange={(e) => setEditedProject({ ...editedProject, fecha_fin: e.target.value })}
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