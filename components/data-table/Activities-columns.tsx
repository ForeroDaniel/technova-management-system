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
 * - Display of related employee and project names (instead of IDs)
 * - Action dropdown menu for edit/delete operations
 * - Text-based filtering on description field
 */

"use client"

// Import necessary components and types for table column definitions
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ActionCell } from "@/components/data-table/action-cell"
import { ActivityDialog } from "@/components/dialog-edit/activity-dialog"

// Define the shape of our Activity data type
export type Activity = {
  id: number
  descripcion: string
  tipo: string
  minutos: number
  empleado_id: number
  proyecto_id: number
  fecha: string
  // Additional fields from joins
  empleado_nombre?: string
  proyecto_nombre?: string
}

// Define table columns configuration
export const columns = (onUpdate: () => Promise<void>): ColumnDef<Activity>[] => [
  // ID column for initial sorting
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center pl-0"
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  // Description column
  {
    accessorKey: "descripcion",
    header: "Descripción",
  },
  // Type column
  {
    accessorKey: "tipo",
    header: "Tipo",
  },
  // Time column - with minutes formatting and sorting
  {
    accessorKey: "minutos",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center pl-0"
        >
          Tiempo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const minutes = parseInt(row.getValue("minutos"))
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      return (
        <div className="font-medium">
          {hours > 0 ? `${hours}h ` : ''}{remainingMinutes}m
        </div>
      )
    },
  },
  // Employee column - displays the employee's name if available
  {
    accessorKey: "empleado_nombre",
    header: "Empleado",
    cell: ({ row }) => {
      return row.getValue("empleado_nombre") || `ID: ${row.getValue("empleado_id")}`
    },
  },
  // Project column - displays the project's name if available
  {
    accessorKey: "proyecto_nombre",
    header: "Proyecto",
    cell: ({ row }) => {
      return row.getValue("proyecto_nombre") || `ID: ${row.getValue("proyecto_id")}`
    },
  },
  // Date column
  {
    accessorKey: "fecha",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center pl-0"
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("fecha"))
      return <div>{date.toLocaleDateString('es-ES')}</div>
    },
  },
  // Actions column
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right"></div>,
    cell: ({ row }) => (
      <ActionCell
        entity={row.original}
        entityName="Activity"
        EditDialog={ActivityDialog}
        onUpdate={onUpdate}
      />
    ),
  },
] 