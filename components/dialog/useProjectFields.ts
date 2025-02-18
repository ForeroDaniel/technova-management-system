import * as z from "zod"
import { Project } from "@/components/data-table/projects-columns"

export function useProjectFields(project?: Project) {
  const fields = [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text' as const,
      validation: z.string().min(1, "El nombre es requerido"),
    },
    {
      name: 'presupuesto',
      label: 'Presupuesto',
      type: 'number' as const,
      validation: z.string().refine(
        (val: string) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
        "El presupuesto debe ser un número positivo"
      ),
      transform: (value: string) => parseFloat(value),
      defaultValue: '0',
    },
    {
      name: 'compania',
      label: 'Compañía',
      type: 'text' as const,
      validation: z.string().min(1, "La compañía es requerida"),
    },
    {
      name: 'fecha_inicio',
      label: 'Fecha de Inicio',
      type: 'date' as const,
      validation: z.string().min(1, "La fecha de inicio es requerida"),
      defaultValue: project ? undefined : new Date().toISOString().split('T')[0],
    },
    {
      name: 'fecha_fin',
      label: 'Fecha de Fin',
      type: 'date' as const,
      validation: z.string()
        .min(1, "La fecha de fin es requerida")
        .refine(
          (val: string) => {
            if (project) {
              if (!project.fecha_inicio || !val) return false;
              return new Date(val) >= new Date(project.fecha_inicio);
            } else {
              const startDate = document.querySelector<HTMLInputElement>('input[name="fecha_inicio"]')?.value;
              if (!startDate || !val) return false;
              return new Date(val) >= new Date(startDate);
            }
          },
          "La fecha de fin debe ser posterior a la fecha de inicio"
        ),
      defaultValue: project ? undefined : new Date().toISOString().split('T')[0],
    },
  ]

  return fields
}