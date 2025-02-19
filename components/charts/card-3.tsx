/**
 * Card3 Component - Hours Per Project Chart
 * 
 * Displays a donut chart showing the distribution of hours across projects:
 * - Each segment represents a different project
 * - The size of each segment shows the relative time investment
 * - The center shows the total hours across all projects
 * - Tooltips show detailed hours and percentages
 * 
 * Uses different colors for each project segment for easy differentiation.
 */

'use client'

import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card"; 
import { useAppDataSWR } from "@/hooks/useApiData";
import { getProjectHoursData } from "@/utils/chart-data";
import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Cell,
    Legend,
    Tooltip,
} from "recharts";

export default function Card3() {
    // Get data from SWR hook
    const { projects, activities } = useAppDataSWR();

    // Get processed data for the chart
    const projectHours = getProjectHoursData(projects, activities);

    // Calculate total hours for center text
    const totalHours = projectHours.reduce((acc, project) => acc + project.value, 0);

    // Colors for the donut segments
    const COLORS = [
        'hsl(var(--chart-1))',
        'hsl(var(--chart-2))',
        'hsl(var(--chart-3))',
        'hsl(var(--chart-4))',
        'hsl(var(--chart-5))',
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Horas invertidas por proyecto</CardTitle>
                <CardDescription>tiempo total invertido en un proyecto</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        {/* Donut chart configuration */}
                        <Pie
                            data={projectHours}
                            innerRadius="60%" // Creates the donut hole
                            outerRadius="80%"
                            paddingAngle={2} // Space between segments
                            dataKey="value"
                        >
                            {/* Create colored segments for each project */}
                            {projectHours.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        {/* Enhanced tooltip with hours and percentage */}
                        <Tooltip 
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    const percentage = ((data.value / totalHours) * 100).toFixed(1);
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="grid gap-2">
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    {data.name}
                                                </p>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            Horas
                                                        </span>
                                                        <span className="font-bold">
                                                            {data.value}h
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            Porcentaje
                                                        </span>
                                                        <span className="font-bold">
                                                            {percentage}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend />

                        {/* Center text showing total hours */}
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-foreground"
                        >
                            <tspan x="50%" dy="-1em" className="text-lg font-bold">
                                {totalHours.toFixed(1)}h
                            </tspan>
                            <tspan x="50%" dy="1.5em" className="text-sm fill-muted-foreground">
                                Total
                            </tspan>
                        </text>
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
