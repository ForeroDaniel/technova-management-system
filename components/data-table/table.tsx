/**
 * Generic Data Table Component
 * 
 * Features:
 * - Pagination: Navigate through large datasets with Previous/Next controls
 * - Column Filtering: Filter data based on user input
 * - Sorting: Sort data when enabled in column definitions
 * - Responsive Design: Adapts to different screen sizes
 * - Type Safety: Fully typed with TypeScript for data integrity
 * 
 * Technical Implementation:
 * - Built on TanStack Table (React Table) for core functionality
 * - Uses shadcn/ui components for consistent UI elements
 * - Implements controlled components pattern for state management
 * 
 * @template TData - Type for the data items being displayed (e.g., User, Product)
 * @template TValue - Type for the individual cell values
 */

"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
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

/**
 * Interface defining the required props for the DataTable component
 * 
 * @property columns - Array of column definitions that specify how to display and handle data
 * @property data - Array of data items to be displayed in the table
 * @property filterColumn - Optional name of the column to enable filtering (defaults to "nombre")
 * @property filterPlaceholder - Optional placeholder text for the filter input
 */
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterColumn?: string
  filterPlaceholder?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn = "nombre",              // Default to "nombre" if not specified
  filterPlaceholder = "Filtrar..."    // Default generic placeholder
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [sorting, setSorting] = React.useState<SortingState>([])

    /**
     * Table initialization using useReactTable hook
     * Configures core functionality:
     * - Core row model for basic table structure
     * - Pagination model for data segmentation
     * - Sorting model for column sorting
     * - Filtering model for data filtering
     */
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

  return (
    <div>
      {/* Search/filter input field */}
      <div className="flex items-center py-4">
        <Input
          placeholder={filterPlaceholder}
          value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterColumn)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      {/* Main table structure */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
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