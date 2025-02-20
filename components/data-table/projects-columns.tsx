/**
 * Project Table Columns Configuration
 * 
 * Defines the column structure for the projects table, including:
 * - Sortable columns (name, budget, start date)
 * - Formatted columns (budget in USD, dates in Spanish format)
 * - Action column with edit/delete functionality
 * 
 * Built with Tanstack Table column definitions.
 */

"use client"

import { Project } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ActionCell } from "@/components/data-table/action-cell"

/**
 * Column definitions for the projects table
 * @param onUpdate - Callback function to refresh data after modifications
 */
export const columns = (onUpdate: () => Promise<void>): ColumnDef<Project>[] => [
  // Name column - with sorting
  {
    accessorKey: "nombre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center pl-0"
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  // Company column - simple text display
  {
    accessorKey: "compania",
    header: "Compañía",
  },
  // Budget column - with currency formatting and sorting
  {
    accessorKey: "presupuesto",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center pr-0 ml-auto"
          >
            Presupuesto
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      // Format budget as USD currency
      const amount = parseFloat(row.getValue("presupuesto"))
      const formatted = new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "narrowSymbol",
      }).format(amount)
      
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  // Start date column - with sorting and date formatting
  {
    accessorKey: "fecha_inicio",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center pl-0"
        >
          Fecha Inicio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      // Format date in Spanish locale
      const date = new Date(row.getValue("fecha_inicio"))
      return <div>{date.toLocaleDateString('es-ES')}</div>
    },
    sortingFn: "datetime",
    sortDescFirst: true,
  },
  // End date column - with date formatting
  {
    accessorKey: "fecha_fin",
    header: "Fecha Fin",
    cell: ({ row }) => {
      // Format date in Spanish locale
      const date = new Date(row.getValue("fecha_fin"))
      return <div>{date.toLocaleDateString('es-ES')}</div>
    },
  },
  // Actions column - with edit/delete functionality
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right"></div>,
    cell: ({ row }) => (
      <ActionCell
        entity={row.original}
        entityName="Project"
        onUpdate={onUpdate}
      />
    ),
  },
] 