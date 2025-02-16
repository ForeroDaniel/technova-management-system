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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Define the shape of our Employee data type
export type Employee = {
  id: string
  name: string
  email: string
  role: string
}

// Define table columns configuration
export const columns: ColumnDef<Employee>[] = [
  // Name column - with sorting
  {
    accessorKey: "name",
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
    accessorKey: "email",
    header: "Correo Electrónico",
  },
  // Role column - simple text display
  {
    accessorKey: "role",
    header: "Rol",
  },
  // Actions column - dropdown menu with edit/delete options
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right"></div>,
    cell: ({ row }) => {
      const employee = row.original
 
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