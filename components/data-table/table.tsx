/**
 * DataTable Component
 * 
 * A reusable table component with advanced features:
 * - Column sorting
 * - Text filtering
 * - Pagination
 * - Custom create button
 * - Empty state handling
 * 
 * Built on top of @tanstack/react-table with shadcn/ui components.
 * 
 * Usage:
 * <DataTable
 *   columns={columns}
 *   data={data}
 *   filterColumn="name"
 *   filterPlaceholder="Search..."
 *   createButton={<CreateButton />}
 * />
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
 * Props definition for the DataTable component
 */
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]    // Column definitions
  data: TData[]                          // Table data
  filterColumn?: string                  // Column to filter by
  filterPlaceholder?: string            // Placeholder for filter input
  createButtonText?: string             // Text for create button
  createButton?: React.ReactNode        // Custom create button component
  initialSorting?: {                    // Initial sorting configuration
    id: string
    desc: boolean
  }[]
}

/**
 * DataTable Component
 * 
 * A flexible table component that handles data display, sorting,
 * filtering, and pagination.
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn = "nombre",              // Default to "nombre" if not specified
  filterPlaceholder = "Filtrar...",    // Default generic placeholder
  createButtonText,
  createButton,
  initialSorting = []
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [sorting, setSorting] = React.useState<SortingState>(initialSorting)

    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        state: {
            sorting,
            columnFilters,
        },
    })

    /**
     * Renders the create button based on provided props
     * Returns custom button, text button, or null
     */
    const renderCreateButton = () => {
        if (createButton) return createButton;
        if (createButtonText) return <Button variant="default">{createButtonText}</Button>;
        return null;
    };

    return (
        <div>
            {/* Search and create button section */}
            <div className="flex items-center py-4 gap-2">
                {/* Filter input */}
                <Input
                    placeholder={filterPlaceholder}
                    value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(filterColumn)?.setFilterValue(event.target.value)
                    }
                    className="w-full"
                />
                {renderCreateButton()}
            </div>

            {/* Main table structure */}
            <div className="rounded-md border">
                <Table>
                    {/* Table header */}
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

                    {/* Table body */}
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
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    )
} 