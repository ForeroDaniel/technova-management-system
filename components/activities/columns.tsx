/**
 * Activity Table Column Definitions
 * 
 * This file defines the structure and behavior of columns in the activities table.
 * It includes:
 * - Column data type definitions (Activity interface)
 * - Column configurations for each field
 * - Custom cell renderers for specific data types
 * - Action menu configuration for row operations
 * 
 * The columns are configured to work with the DataTable component and include
 * features like:
 * - Formatted date display
 * - Numeric formatting for hours
 * - Action dropdown menu for edit/delete operations
 * - Text-based filtering on description field
 */

"use client"

// Import necessary components and types for table column definitions
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Define the shape of our Activity data type
export type Activity = {
  id: string
  description: string
  hours: number
  employee_id: string
  project_id: string
  date: string
}

// Define table columns configuration
export const columns: ColumnDef<Activity>[] = [
  // Description column - simple text display
  {
    accessorKey: "description",
    header: "Descripción",
  },
  // Hours column - numeric display
  {
    accessorKey: "hours",
    header: "Horas",
    cell: ({ row }) => {
      const hours = parseFloat(row.getValue("hours"))
      return <div className="font-medium">{hours}</div>
    },
  },
  // Employee ID column - simple text display
  {
    accessorKey: "employee_id",
    header: "ID Empleado",
  },
  // Project ID column - simple text display
  {
    accessorKey: "project_id",
    header: "ID Proyecto",
  },
  // Date column - formatted date display
  {
    accessorKey: "date",
    header: "Fecha",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      return <div>{date.toLocaleDateString('es-ES')}</div>
    },
  },
  // Actions column - dropdown menu with edit/delete options
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right"></div>,
    cell: ({ row }) => {
      const activity = row.original
 
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem>
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
] 