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
 * Features:
 * - Formatted date display
 * - Numeric formatting for hours
 * - Display of related employee and project names
 * - Action dropdown menu for edit/delete operations
 * - Text-based filtering on description field
 */

"use client"

import { Activity } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ActionCell } from "@/components/data-table/action-cell"

/**
 * Column definitions for the activities table
 * @param onUpdate - Callback function to refresh data after modifications
 */
export const columns = (onUpdate: () => Promise<void>): ColumnDef<Activity>[] => [
    // Date column - with sorting and formatting
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
        sortingFn: "datetime",
        sortDescFirst: true,
    },

    // Description column - text only
    {
        accessorKey: "descripcion",
        header: "Descripción",
    },

    // Type column - text only
    {
        accessorKey: "tipo",
        header: "Tipo",
    },

    // Time column - with minutes/hours formatting and sorting
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
            // Convert minutes to hours and minutes format
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

    // Employee column - shows name or fallback to ID
    {
        accessorKey: "empleado_nombre",
        header: "Empleado",
        cell: ({ row }) => {
            return row.getValue("empleado_nombre") || `ID: ${row.getValue("empleado_id")}`
        },
    },

    // Project column - shows name or fallback to ID
    {
        accessorKey: "proyecto_nombre",
        header: "Proyecto",
        cell: ({ row }) => {
            return row.getValue("proyecto_nombre") || `ID: ${row.getValue("proyecto_id")}`
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
                entityName="Activity"
                onUpdate={onUpdate}
            />
        ),
    },
] 