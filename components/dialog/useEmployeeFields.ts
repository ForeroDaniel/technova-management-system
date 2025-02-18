import * as z from "zod"

export function useEmployeeFields() {
  const fields = [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text' as const,
      validation: z.string().min(1, "El nombre es requerido"),
    },
    {
      name: 'correo_electronico',
      label: 'Correo Electrónico',
      type: 'email' as const,
      validation: z.string().email("Correo electrónico inválido"),
    },
    {
      name: 'equipo',
      label: 'Equipo',
      type: 'text' as const,
      validation: z.string().min(1, "El equipo es requerido"),
    },
    {
      name: 'costo_por_hora',
      label: 'Costo por Hora',
      type: 'number' as const,
      validation: z.string().refine(
        (val: string) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
        "El costo por hora debe ser un número positivo"
      ),
      transform: (value: string) => parseFloat(value),
      defaultValue: '0',
    },
  ]

  return fields
}