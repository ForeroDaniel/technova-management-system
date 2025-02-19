/**
 * Field Factory Module
 * 
 * Centralized utilities for form field creation and validation.
 * Provides reusable field configurations, validation rules,
 * and standardized error messages.
 */

import * as z from "zod"
import { Field } from "@/components/dialog/base-dialog"

/**
 * Supported field input types
 */
export type FieldType = 'text' | 'email' | 'number' | 'date' | 'select'

/**
 * Base configuration for creating form fields
 */
export interface FieldConfig {
  name: string                    // Field identifier
  label: string                   // Display label
  type: FieldType                 // Input type
  validation: z.ZodTypeAny        // Validation schema
  transform?: (value: string) => any  // Value transformation
  defaultValue?: string           // Initial value
  options?: { label: string; value: string }[]  // Select options
  defaultLabel?: string           // Default option label
}

/**
 * Creates a form field from the given configuration
 * @param config - Field configuration object
 * @returns Field object ready for use in forms
 */
export const createField = (config: FieldConfig): Field => {
  return {
    ...config,
    type: config.type
  }
}

/**
 * Common validation rules with consistent error messages
 * 
 * Provides reusable validation schemas with consistent error messages:
 * - Required field validation
 * - Email format validation
 * - Positive number validation
 * - Positive integer validation
 */
export const validations = {
  /**
   * Validates required fields
   * @param field - Field name for error message
   */
  required: (field: string) => z.string().min(1, `${field} es requerido`),

  /**
   * Validates email format
   */
  email: () => z.string().email("Correo electrónico inválido"),

  /**
   * Validates positive decimal numbers
   * @param field - Field name for error message
   */
  positiveNumber: (field: string) => z.string().refine(
    (val: string) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
    `${field} debe ser un número positivo`
  ),

  /**
   * Validates positive integers
   * @param field - Field name for error message
   */
  positiveInteger: (field: string) => z.string().refine(
    (val: string) => !isNaN(parseInt(val)) && parseInt(val) > 0,
    `${field} debe ser un número positivo`
  )
} 