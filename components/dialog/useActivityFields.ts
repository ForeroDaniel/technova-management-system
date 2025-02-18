import { useEffect } from "react"
import * as z from "zod"
import { useSharedData } from "../hooks/useSharedData"

interface Employee {
  id: number
  nombre: string
}

interface Project {
  id: number
  nombre: string
}

interface Activity {
  empleado_id: number
  proyecto_id: number
  empleado_nombre?: string
  proyecto_nombre?: string
}

export function useActivityFields(currentActivity?: Activity) {
  const { employees, projects, fetchData, hasInitialized } = useSharedData()

  useEffect(() => {
    // Only fetch if we haven't initialized yet
    if (!hasInitialized) {
      fetchData()
    }
  }, [hasInitialized, fetchData])

  const fields = [
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'text' as const,
      validation: z.string().min(1, "La descripción es requerida"),
    },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'text' as const,
      validation: z.string().min(1, "El tipo es requerido"),
    },
    {
      name: 'minutos',
      label: 'Minutos',
      type: 'number' as const,
      validation: z.string().refine(
        (val: string) => !isNaN(parseInt(val)) && parseInt(val) > 0,
        "Los minutos deben ser un número positivo"
      ),
      transform: (value: string) => parseInt(value),
      defaultValue: '0',
    },
    {
      name: 'empleado_id',
      label: 'Empleado',
      type: 'select' as const,
      validation: z.string().min(1, "El empleado es requerido"),
      transform: (value: string) => parseInt(value),
      options: employees.map(emp => ({
        value: emp.id.toString(),
        label: emp.nombre
      })),
      defaultValue: currentActivity?.empleado_id?.toString(),
      defaultLabel: currentActivity?.empleado_nombre,
    },
    {
      name: 'proyecto_id',
      label: 'Proyecto',
      type: 'select' as const,
      validation: z.string().min(1, "El proyecto es requerido"),
      transform: (value: string) => parseInt(value),
      options: projects.map(proj => ({
        value: proj.id.toString(),
        label: proj.nombre
      })),
      defaultValue: currentActivity?.proyecto_id?.toString(),
      defaultLabel: currentActivity?.proyecto_nombre,
    },
    {
      name: 'fecha',
      label: 'Fecha',
      type: 'date' as const,
      validation: z.string().min(1, "La fecha es requerida"),
    },
  ]

  return fields
}