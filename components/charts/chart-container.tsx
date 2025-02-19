/**
 * ChartContainer Component
 * 
 * A responsive grid layout that displays four different charts:
 * - Card1: Total cost per project
 * - Card2: Gross profitability comparison
 * - Card3: Hours invested per project
 * - Card4: Workload calculation
 * 
 * The grid adjusts from 1 column on mobile to 2 columns on larger screens.
 */

import Card1 from "@/components/charts/card-1"
import Card2 from "@/components/charts/card-2"
import Card3 from "@/components/charts/card-3"
import Card4 from "@/components/charts/card-4"

export default function ChartContainer() {
    return (
        // Main container with responsive grid
        <div className="w-full max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {/* Chart cards */}
            <Card1 /> {/* Total cost per project */}
            <Card2 /> {/* Gross profitability */}
            <Card3 /> {/* Hours invested */}
            <Card4 /> {/* Workload calculation */}
        </div>
    )
}