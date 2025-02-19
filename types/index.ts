// Entity Types
export interface Employee {
  id: number
  nombre: string
  correo_electronico: string
  equipo: string
  costo_por_hora: number
}

export interface Project {
  id: number
  nombre: string
  compania: string
  presupuesto: number
  fecha_inicio: string
  fecha_fin: string
}

export interface Activity {
  id: number
  descripcion: string
  tipo: string
  minutos: number
  empleado_id: number
  proyecto_id: number
  fecha: string
  empleado_nombre?: string
  proyecto_nombre?: string
}

// Entity Type Definitions
export type EntityTypeSingular = 'activity' | 'project' | 'employee'
export type EntityTypePlural = 'activities' | 'projects' | 'employees'
export type EntityType = EntityTypeSingular | EntityTypePlural 