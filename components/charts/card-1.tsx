/**
 * Card1 Component - Total Cost Per Project Chart
 * 
 * Displays a bar chart showing the total cost of each project.
 * The cost is calculated by:
 * 1. Finding all activities for each project
 * 2. Calculating the cost of each activity based on employee rates
 * 3. Summing up all activity costs per project
 */

'use client'

import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import { useAppDataSWR } from "@/hooks/useApiData";
import { getProjectCostsData } from "@/utils/chart-data";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

export default function Card1() {
    // Get data from SWR hook
    const { projects, activities, employees } = useAppDataSWR();

    // Get processed data for the chart
    const projectCosts = getProjectCostsData(projects, activities, employees);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Costo total por proyecto</CardTitle>
                <CardDescription>
                    Costo de todas las actividades asociadas a un proyecto
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={projectCosts}>
                        {/* X-axis configuration */}
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        {/* Y-axis configuration with currency format */}
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                        />
                        {/* Bar configuration */}
                        <Bar
                            dataKey="value"
                            radius={[4, 4, 0, 0]}
                            fill="hsl(var(--chart-1))"
                        />
                        {/* Tooltip configuration */}
                        <Tooltip 
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">
                                                    {payload[0].payload.name}: ${payload[0].value}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

