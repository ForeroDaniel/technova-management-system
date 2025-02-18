/**
 * Unified Base Dialog Component
 * 
 * Core dialog component that provides the foundation for both creation and editing
 * of entities with common structure and styling.
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

export interface SelectOption {
  value: string
  label: string
}

export interface Field {
  name: string
  label: string
  type: 'text' | 'number' | 'date' | 'email' | 'select'
  validation: z.ZodTypeAny
  transform?: (value: string) => any
  defaultValue?: string
  options?: SelectOption[]
}

interface BaseDialogCommonProps {
  entityName: string
  entityEndpoint: string
  fields: Field[]
  onUpdate: () => Promise<void>
}

interface CreateDialogProps extends BaseDialogCommonProps {
  mode: 'create'
  triggerText: string
  title: string
  description: string
  submitText: string
}

interface EditDialogProps<T> extends BaseDialogCommonProps {
  mode: 'edit'
  entity: T
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (entity: T) => void
}

type BaseDialogProps<T> = CreateDialogProps | EditDialogProps<T>

export function BaseDialog<T extends { id?: number }>(props: BaseDialogProps<T>) {
  const [internalOpen, setInternalOpen] = useState(false)
  
  const isCreateMode = props.mode === 'create'
  const open = isCreateMode ? internalOpen : props.open
  const setOpen = isCreateMode ? setInternalOpen : props.onOpenChange

  // Create schema dynamically from fields
  const schemaFields = props.fields.reduce<Record<string, z.ZodTypeAny>>((acc, field) => {
    acc[field.name] = field.validation;
    return acc;
  }, {});

  const schema = z.object(schemaFields);
  type FormValues = z.infer<typeof schema>

  // Create default values
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

  const onSubmit = async (data: FormValues) => {
    try {
      const transformedData = props.fields.reduce<Record<string, any>>((acc, field) => {
        acc[field.name] = field.transform ? 
          field.transform(data[field.name] as string) : 
          data[field.name];
        return acc;
      }, {});

      const url = isCreateMode ? 
        props.entityEndpoint : 
        `${props.entityEndpoint}/${(props as EditDialogProps<T>).entity.id}`;

      const method = isCreateMode ? 'POST' : 'PUT';
      const body = isCreateMode ? transformedData : {
        ...transformedData,
        id: (props as EditDialogProps<T>).entity.id
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${isCreateMode ? 'create' : 'update'} ${props.entityName.toLowerCase()}`);
      }
      
      const { data: responseData } = await response.json();
      setOpen(false);
      
      if (!isCreateMode) {
        (props as EditDialogProps<T>).onSave(responseData);
      }
      
      // Revalidate the data using SWR
      await mutate(props.entityEndpoint);
      await props.onUpdate();
      
      if (isCreateMode) {
        form.reset();
      }
    } catch (error) {
      console.error(`Error ${isCreateMode ? 'creating' : 'updating'} ${props.entityName.toLowerCase()}:`, error);
    }
  }

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