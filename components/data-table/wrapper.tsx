/**
 * DataTableWrapper Component
 * 
 * A higher-order component that wraps the DataTable component to provide:
 * - Data fetching and management
 * - Loading states
 * - Error handling
 * - Automatic sorting
 * - Empty state handling
 * 
 * => This component implements the Container pattern, managing all data-related
 * operations and state while delegating the presentation to the DataTable component.
 */

import { useEffect, useState, useCallback, ReactNode } from 'react';
import { DataTable } from '@/components/data-table/table';
import { Spinner } from '@/components/ui/spinner';
import { ColumnDef } from '@tanstack/react-table';

/**
 * Props interface for the DataTableWrapper component
 * 
 * @property title - Display title for the table section
 * @property endpoint - API endpoint URL for fetching data
 * @property columns - Function that returns column definitions with refresh capability
 * @property filterColumn - Column identifier used for filtering data
 * @property filterPlaceholder - Placeholder text for the filter input
 * @property emptyMessage - Message to display when no data is available
 * @property createButtonText - Text for the create button (legacy support)
 * @property createButton - Custom create button component
 * @property initialSorting - Initial sorting configuration
 */
interface DataTableWrapperProps<TData> {
    title: string;
    endpoint: string;
    columns: (refreshData: () => Promise<void>) => ColumnDef<TData>[];
    filterColumn: string;
    filterPlaceholder: string;
    emptyMessage: string;
    createButtonText?: string;
    createButton?: ReactNode;
    initialSorting?: { id: string; desc: boolean }[];
}

/**
 * DataTableWrapper Component Implementation
 * 
 * @template TData - Type of data items, must include an 'id' field of type number
 * 
 * State Management:
 * - data: Stores the fetched and sorted table data
 * - error: Tracks error states during data fetching
 * - loading: Manages loading state during data operations
 */
export function DataTableWrapper<TData extends { id: number }>({
    title,
    endpoint,
    columns,
    filterColumn,
    filterPlaceholder,
    emptyMessage,
    createButtonText,
    createButton,
    initialSorting = []
}: DataTableWrapperProps<TData>) {
    const [data, setData] = useState<TData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    /**
     * Data Fetching Function
     * 
     * Handles:
     * - API data retrieval
     * - Error processing
     * - Data sorting by ID
     * - State updates
     */
    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(endpoint);
            const result = await response.json();
            
            if (result.error) {
                setError(result.error);
            } else {
                // Sort data by ID for consistent display
                const sortedData = result.data.sort((a: TData, b: TData) => a.id - b.id);
                setData(sortedData);
            }
        } catch (err) {
            setError(`Error fetching ${title.toLowerCase()}`);
        } finally {
            setLoading(false);
        }
    }, [endpoint, title]);

    // Initial data fetch on component mount
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    /**
     * Conditional Rendering Logic
     * - Shows spinner during loading
     * - Displays error message if fetch failed
     * - Renders empty state message when no data
     * - Presents DataTable with data when available
     */
    if (loading) return <Spinner />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            {data.length === 0 ? (
                <p>{emptyMessage}</p>
            ) : (
                <DataTable 
                    columns={columns(fetchData)} 
                    data={data}
                    filterColumn={filterColumn}
                    filterPlaceholder={filterPlaceholder}
                    createButtonText={createButtonText}
                    createButton={createButton}
                    initialSorting={initialSorting}
                />
            )}
        </div>
    );
} 