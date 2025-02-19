/**
 * Card4 Component - Weekly Workload Chart
 * 
 * Displays a stacked bar chart showing employee workload distribution:
 * - Each bar represents an employee
 * - Bar segments show hours worked per week
 * - Different colors represent different weeks
 * - Stacking shows total hours and distribution
 * 
 * Features:
 * - Automatic week number calculation
 * - Detailed tooltips with hours breakdown
 * - Color-coded weeks for easy tracking
 */

'use client'

import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card"; 
import { useAppDataSWR } from "@/hooks/useApiData";
import { getEmployeeWorkloadData } from "@/utils/chart-data";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    TooltipProps,
} from "recharts";

export default function Card4() {
    // Get data from SWR hook
    const { activities, employees } = useAppDataSWR();

    // Get processed data for the chart
    const { data: workloadByEmployee, weeks: uniqueWeeks } = getEmployeeWorkloadData(employees, activities);

    // Define colors for different weeks
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
                <CardTitle>Cálculo de carga de trabajo</CardTitle>
                <CardDescription>Agrupa las actividades por empleado y por semana</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={workloadByEmployee}>
                        {/* Axes configuration */}
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value.toFixed(1)}h`}
                        />

                        {/* Enhanced tooltip with detailed breakdown */}
                        <Tooltip
                            content={({ active, payload, label }: TooltipProps<number, string>) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="grid gap-2">
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    {label}
                                                </p>
                                                <div className="grid gap-1">
                                                    {/* Show hours for each week */}
                                                    {payload.map((entry, index) => (
                                                        <div key={index} className="flex items-center justify-between gap-2">
                                                            <div className="flex items-center gap-1">
                                                                <div 
                                                                    className="h-2 w-2 rounded"
                                                                    style={{ backgroundColor: entry.color }}
                                                                />
                                                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                    {entry.name}
                                                                </span>
                                                            </div>
                                                            <span className="font-bold">
                                                                {entry.value?.toFixed(1)}h
                                                            </span>
                                                        </div>
                                                    ))}
                                                    {/* Show total hours */}
                                                    <div className="border-t pt-1 mt-1">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                Total
                                                            </span>
                                                            <span className="font-bold">
                                                                {payload.reduce((sum, entry) => 
                                                                    sum + (entry.value || 0), 0
                                                                ).toFixed(1)}h
                                                            </span>
                                                        </div>
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

                        {/* Create stacked bars for each week */}
                        {uniqueWeeks.map((week, index) => (
                            <Bar
                                key={week}
                                dataKey={week}
                                name={week}
                                stackId="a"
                                fill={COLORS[index % COLORS.length]}
                                radius={[0, 0, 0, 0]}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
