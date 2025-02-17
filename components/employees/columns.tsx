"use client"

// Import necessary components and types for table column definitions
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { EditEmployeeDialog } from "./edit-employee-dialog"

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
    cell: ({ row }) => {
      const employee = row.original
      const [open, setOpen] = useState(false)
      const [localEmployee, setLocalEmployee] = useState(employee)

      const handleSave = (updatedEmployee: Employee) => {
        setLocalEmployee(updatedEmployee)
      }
 
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
              <DropdownMenuItem onClick={() => setOpen(true)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem>
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditEmployeeDialog 
            employee={localEmployee}
            open={open}
            onOpenChange={setOpen}
            onSave={handleSave}
            onUpdate={onUpdate}
          />
        </div>
      )
    },
  },
] 