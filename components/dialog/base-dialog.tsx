/**
 * Unified Base Dialog Component
 * 
 * Core dialog component that provides the foundation for both creation and editing
 * of entities. Features:
 * - Dynamic form generation based on field configuration
 * - Validation using Zod schemas
 * - Error handling and toast notifications
 * - Automatic data refresh using SWR
 * - Responsive design
 * 
 * Usage:
 * <BaseDialog
 *   mode="create|edit"
 *   entityName="Project"
 *   entityEndpoint="/api/projects"
 *   fields={[...]}
 *   onUpdate={handleUpdate}
 * />
 */

"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { mutate } from 'swr'
import { useToast } from "@/hooks/use-toast"

// Type Definitions
/**
 * Select option type for dropdown fields
 */
export interface SelectOption {
    value: string
    label: string
}

/**
 * Field configuration type
 */
export interface Field {
    name: string                  // Field identifier
    label: string                // Display label
    type: 'text' | 'number' | 'date' | 'email' | 'select'  // Input type
    validation: z.ZodTypeAny     // Zod validation schema
    transform?: (value: string) => any  // Optional value transformer
    defaultValue?: string        // Default value
    options?: SelectOption[]     // Options for select fields
}

// Props Interfaces
/**
 * Common props for both create and edit modes
 */
interface BaseDialogCommonProps {
    entityName: string           // Display name of the entity
    entityEndpoint: string       // API endpoint
    fields: Field[]             // Field configurations
    onUpdate: () => Promise<void> // Update callback
}

/**
 * Props specific to create mode
 */
interface CreateDialogProps extends BaseDialogCommonProps {
    mode: 'create'
    triggerText: string
    title: string
    description: string
    submitText: string
}

/**
 * Props specific to edit mode
 */
interface EditDialogProps<T> extends BaseDialogCommonProps {
    mode: 'edit'
    entity: T
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (entity: T) => void
}

type BaseDialogProps<T> = CreateDialogProps | EditDialogProps<T>

/**
 * BaseDialog Component
 * 
 * A flexible dialog component that handles both creation and editing
 * of entities with dynamic form generation and validation.
 */
export function BaseDialog<T extends { id?: number }>(props: BaseDialogProps<T>) {
    // State Management
    const [internalOpen, setInternalOpen] = useState(false)
    const { toast } = useToast()
    
    const isCreateMode = props.mode === 'create'
    const open = isCreateMode ? internalOpen : props.open
    const setOpen = isCreateMode ? setInternalOpen : props.onOpenChange

    // Form Configuration
    const schemaFields = props.fields.reduce<Record<string, z.ZodTypeAny>>((acc, field) => {
        acc[field.name] = field.validation;
        return acc;
    }, {});

    const schema = z.object(schemaFields);
    type FormValues = z.infer<typeof schema>

    // Initialize default values
    const defaultValues = props.fields.reduce<Record<string, string>>((acc, field) => {
        if (isCreateMode) {
            acc[field.name] = field.defaultValue || '';
        } else {
            const entity = (props as EditDialogProps<T>).entity;
            acc[field.name] = field.type === 'number' ? 
                (entity as any)[field.name].toString() : 
                (entity as any)[field.name];
        }
        return acc;
    }, {});

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues,
    })

    /**
     * Handle form submission
     * Performs API call and handles success/error states
     */
    const onSubmit = async (data: FormValues) => {
        try {
            // Transform field values if needed
            const transformedData = props.fields.reduce<Record<string, any>>((acc, field) => {
                acc[field.name] = field.transform ? 
                    field.transform(data[field.name] as string) : 
                    data[field.name];
                return acc;
            }, {});

            // Prepare request configuration
            const url = isCreateMode ? 
                props.entityEndpoint : 
                `${props.entityEndpoint}/${(props as EditDialogProps<T>).entity.id}`;

            const method = isCreateMode ? 'POST' : 'PUT';
            const body = isCreateMode ? transformedData : {
                ...transformedData,
                id: (props as EditDialogProps<T>).entity.id
            };

            // Make API request
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to ${isCreateMode ? 'create' : 'update'} ${props.entityName.toLowerCase()}`);
            }
            
            // Handle successful response
            const { data: responseData } = await response.json();
            setOpen(false);
            
            if (!isCreateMode) {
                (props as EditDialogProps<T>).onSave(responseData);
            }
            
            // Show success notification
            toast({
                title: `${props.entityName} ${props.entityName.toLowerCase() === 'actividad' ? (isCreateMode ? 'creada' : 'actualizada') : (isCreateMode ? 'creado' : 'actualizado')}`,
                description: `${props.entityName} se ha ${isCreateMode ? 'creado' : 'actualizado'} correctamente.`,
            });
            
            // Refresh data and reset form
            await mutate(props.entityEndpoint);
            await props.onUpdate();
            
            if (isCreateMode) {
                form.reset();
            }
        } catch (error) {
            // Handle errors
            toast({
                variant: "destructive",
                title: `Error al ${isCreateMode ? 'crear' : 'actualizar'} ${props.entityName.toLowerCase()}`,
                description: error instanceof Error ? error.message : "Ha ocurrido un error inesperado.",
            });
            console.error(`Error ${isCreateMode ? 'creating' : 'updating'} ${props.entityName.toLowerCase()}:`, error);
        }
    }

    // Render dialog content
    const dialogContent = (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>
                    {isCreateMode ? props.title : `Editar ${props.entityName}`}
                </DialogTitle>
                <DialogDescription>
                    {isCreateMode ? props.description : `Realiza cambios en los datos ${props.entityName.toLowerCase() === 'actividad' ? 'de la' : 'del'} ${props.entityName.toLowerCase()}.`}
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Dynamic form fields */}
                    {props.fields.map((field) => (
                        <FormField
                            key={field.name}
                            control={form.control}
                            name={field.name}
                            render={({ field: formField }) => (
                                <FormItem>
                                    <FormLabel>{field.label}</FormLabel>
                                    <FormControl>
                                        {field.type === 'select' && field.options ? (
                                            <Select
                                                onValueChange={formField.onChange}
                                                defaultValue={formField.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder={`Seleccionar ${field.label}`} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {field.options.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            <Input
                                                type={field.type}
                                                step={field.type === 'number' ? "0.01" : undefined}
                                                {...formField}
                                            />
                                        )}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <DialogFooter>
                        <Button type="submit">
                            {isCreateMode ? props.submitText : 'Guardar cambios'}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    )

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {isCreateMode && (
                <DialogTrigger asChild>
                    <Button variant="default">{props.triggerText}</Button>
                </DialogTrigger>
            )}
            {dialogContent}
        </Dialog>
    )
}