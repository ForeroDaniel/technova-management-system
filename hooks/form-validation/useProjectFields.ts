/**
 * Project Fields Hook
 * 
 * Provides field configurations for project forms with:
 * - Field definitions
 * - Validation rules
 * - Type transformations
 * - Default values
 * 
 * Used in create and edit dialogs for projects.
 */

import { createField, validations } from "@/hooks/form-validation/fieldFactory"

/**
 * Hook that returns field configurations for project forms
 * @returns Array of field configurations
 */
export function useProjectFields() {
    const fields = [
        createField({
            name: 'nombre',
            label: 'Nombre',
            type: 'text',
            validation: validations.required('El nombre'),
        }),
        createField({
            name: 'compania',
            label: 'Compañía',
            type: 'text',
            validation: validations.required('La compañía'),
        }),
        createField({
            name: 'presupuesto',
            label: 'Presupuesto',
            type: 'number',
            validation: validations.positiveNumber('El presupuesto'),
            transform: (value: string) => parseFloat(value),
            defaultValue: '0',
        }),
        createField({
            name: 'fecha_inicio',
            label: 'Fecha de Inicio',
            type: 'date',
            validation: validations.required('La fecha de inicio'),
        }),
        createField({
            name: 'fecha_fin',
            label: 'Fecha de Fin',
            type: 'date',
            validation: validations.required('La fecha de fin'),
        }),
    ]

    return fields
}