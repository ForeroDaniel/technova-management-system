/**
 * Employee Table Column Definitions
 * 
 * This file defines the structure and behavior of columns in the employees table.
 * It includes:
 * - Column data type definitions (Employee interface)
 * - Column configurations for each field
 * - Custom cell renderers for currency formatting
 * - Action menu configuration for row operations
 * 
 * Features:
 * - Sortable name column
 * - Currency formatting for cost per hour
 * - Action dropdown menu for edit/delete operations
 */

"use client"

import { Employee } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ActionCell } from "@/components/data-table/action-cell"

// Define table columns configuration
export const columns = (onUpdate: () => Promise<void>): ColumnDef<Employee>[] => [
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
    sortingFn: "text",
    sortDescFirst: false,
  },
  // Email column - simple text display
  {
    accessorKey: "correo_electronico",
    header: "Correo Electrónico",
  },
  // Team column - simple text display
  {
    accessorKey: "equipo",
    header: "Equipo",
  },
  // Cost per hour column - with currency formatting and sorting
  {
    accessorKey: "costo_por_hora",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center pr-0 ml-auto"
          >
            Costo por Hora
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      // Format amount as USD currency
      const amount = parseFloat(row.getValue("costo_por_hora"));
      const formatted = new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "narrowSymbol",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
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
        entityName="Employee"
        onUpdate={onUpdate}
      />
    ),
  },
] 