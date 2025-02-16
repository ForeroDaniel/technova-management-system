"use client"

import * as React from "react"

// Import necessary table functionality from TanStack Table
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

// Import UI components for table structure
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Define props interface for the DataTable component
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]  // Column definitions
  data: TData[]                        // Data to display
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
    // State for managing column filters
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
      )

    // Initialize table with configuration
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),         // Basic table functionality
        getPaginationRowModel: getPaginationRowModel(), // Pagination support
        onColumnFiltersChange: setColumnFilters,    // Filter handling
        getFilteredRowModel: getFilteredRowModel(), // Filtering support
        state: {
            columnFilters,
        },
    })

  return (
    <div>
      {/* Search/filter input field */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por nombre..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      {/* Main table structure */}
      <div className="rounded-md border">
        <Table>
            {/* Table header with column names */}
            <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    return (
                    <TableHead key={header.id}>
                        {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                    </TableHead>
                    )
                })}
                </TableRow>
            ))}
            </TableHeader>

            {/* Table body with data rows */}
            <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                >
                    {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    ))}
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    No hay resultados.
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center justify-end space-x-2 py-4">
            <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            >
            Anterior
            </Button>
            <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            >
            Siguiente
            </Button>
        </div>
    </div>
  )
} 