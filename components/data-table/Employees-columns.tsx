"use client"

// Import necessary components and types for table column definitions
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ActionCell } from "@/components/data-table/action-cell"
import { EmployeeDialog } from "@/components/dialog-edit/employee-dialog"

// Define the shape of our Employee data type
export type Employee = {
  id: number
  nombre: string
  correo_electronico: string
  equipo: string
  costo_por_hora: number
}

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
  // Cost per hour column - with number formatting and sorting
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
      const amount = parseFloat(row.getValue("costo_por_hora"));
      const formatted = new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "narrowSymbol",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  // Actions column - dropdown menu with edit/delete options
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right"></div>,
    cell: ({ row }) => (
      <ActionCell
        entity={row.original}
        entityName="Employee"
        EditDialog={EmployeeDialog}
        onUpdate={onUpdate}
      />
    ),
  },
] 