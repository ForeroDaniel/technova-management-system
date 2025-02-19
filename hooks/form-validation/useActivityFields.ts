/**
 * Activity Fields Hook
 * 
 * Provides field configurations for activity forms with:
 * - Field definitions
 * - Validation rules
 * - Type transformations
 * - Default values
 * - Dynamic select options for employees and projects
 * 
 * Used in create and edit dialogs for activities.
 * Features:
 * - Time tracking in minutes
 * - Employee selection with names
 * - Project selection with names
 * - Date selection
 * - Activity type categorization
 */

import { createField, validations } from "@/hooks/form-validation/fieldFactory"
import { useAppDataSWR } from "@/hooks/useApiData"
import { Activity } from "@/types"

/**
 * Hook that returns field configurations for activity forms
 * @param currentActivity - Optional current activity for edit mode
 * @returns Array of field configurations
 */
export function useActivityFields(currentActivity?: Activity) {
    // Get employees and projects data for select options
    const { employees, projects } = useAppDataSWR()

    const fields = [
        createField({
            name: 'fecha',
            label: 'Fecha',
            type: 'date',
            validation: validations.required('La fecha'),
        }),
        createField({
            name: 'descripcion',
            label: 'Descripción',
            type: 'text',
            validation: validations.required('La descripción'),
        }),
        createField({
            name: 'tipo',
            label: 'Tipo',
            type: 'text',
            validation: validations.required('El tipo'),
        }),
        createField({
            name: 'minutos',
            label: 'Minutos',
            type: 'number',
            validation: validations.positiveInteger('Los minutos'),
            transform: (value: string) => parseInt(value),
            defaultValue: '0',
        }),
        createField({
            name: 'empleado_id',
            label: 'Empleado',
            type: 'select',
            validation: validations.required('El empleado'),
            transform: (value: string) => parseInt(value),
            options: employees.map(emp => ({
                value: emp.id.toString(),
                label: emp.nombre
            })),
            defaultValue: currentActivity?.empleado_id?.toString(),
            defaultLabel: currentActivity?.empleado_nombre,
        }),
        createField({
            name: 'proyecto_id',
            label: 'Proyecto',
            type: 'select',
            validation: validations.required('El proyecto'),
            transform: (value: string) => parseInt(value),
            options: projects.map(proj => ({
                value: proj.id.toString(),
                label: proj.nombre
            })),
            defaultValue: currentActivity?.proyecto_id?.toString(),
            defaultLabel: currentActivity?.proyecto_nombre,
        }),
    ]

    return fields
}