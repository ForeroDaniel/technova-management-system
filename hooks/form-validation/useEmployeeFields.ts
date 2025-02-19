/**
 * Employee Fields Hook
 * 
 * Provides field configurations for employee forms with:
 * - Field definitions
 * - Validation rules
 * - Type transformations
 * - Default values
 * 
 * Used in create and edit dialogs for employees.
 */

import { createField, validations } from "@/hooks/form-validation/fieldFactory"

/**
 * Hook that returns field configurations for employee forms
 * @returns Array of field configurations
 */
export function useEmployeeFields() {
    const fields = [
        createField({
            name: 'nombre',
            label: 'Nombre',
            type: 'text',
            validation: validations.required('El nombre'),
        }),
        createField({
            name: 'correo_electronico',
            label: 'Correo Electrónico',
            type: 'email',
            validation: validations.email(),
        }),
        createField({
            name: 'equipo',
            label: 'Equipo',
            type: 'text',
            validation: validations.required('El equipo'),
        }),
        createField({
            name: 'costo_por_hora',
            label: 'Costo por Hora',
            type: 'number',
            validation: validations.positiveNumber('El costo por hora'),
            transform: (value: string) => parseFloat(value),
            defaultValue: '0',
        }),
    ]

    return fields
}