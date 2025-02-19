/**
 * Card2 Component - Project Profitability Chart
 * 
 * Displays a bar chart comparing three key financial metrics for each project:
 * 1. Budget (presupuesto) - The allocated budget
 * 2. Cost (costo) - Total cost of all activities
 * 3. Profitability (rentabilidad) - The difference between budget and cost
 * 
 * Each metric is shown as a separate bar for easy comparison.
 */

'use client'

import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card"; 
import { useAppDataSWR } from "@/hooks/useApiData";
import { getProjectProfitabilityData } from "@/utils/chart-data";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

export default function Card2() {
    // Get data from SWR hook
    const { projects, activities, employees } = useAppDataSWR();

    // Get processed data for the chart
    const projectComparison = getProjectProfitabilityData(projects, activities, employees);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Rentabilidad bruta</CardTitle>
                <CardDescription>
                    Costo total del proyecto con respecto a su presupuesto
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={projectComparison}>
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
                            tickFormatter={(value) => `$${value}`}
                        />
                        
                        {/* Enhanced tooltip with detailed information */}
                        <Tooltip 
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="grid gap-2">
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    {payload[0].payload.name}
                                                </p>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {/* Budget info */}
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            Presupuesto
                                                        </span>
                                                        <span className="font-bold text-muted-foreground">
                                                            ${payload[0].value}
                                                        </span>
                                                    </div>
                                                    {/* Cost info */}
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            Costo
                                                        </span>
                                                        <span className="font-bold">
                                                            ${payload[1].value}
                                                        </span>
                                                    </div>
                                                    {/* Profitability info */}
                                                    <div className="flex flex-col col-span-2">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            Rentabilidad
                                                        </span>
                                                        <span className="font-bold">
                                                            ${payload[2].value}
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
                        
                        {/* Chart legend */}
                        <Legend />
                        
                        {/* Bars for each metric */}
                        <Bar
                            name="Presupuesto"
                            dataKey="presupuesto"
                            radius={[4, 4, 0, 0]}
                            fill="hsl(var(--chart-1))"
                        />
                        <Bar
                            name="Costo"
                            dataKey="costo"
                            radius={[4, 4, 0, 0]}
                            fill="hsl(var(--chart-2))"
                        />
                        <Bar
                            name="Rentabilidad"
                            dataKey="rentabilidad"
                            radius={[4, 4, 0, 0]}
                            fill="hsl(var(--chart-3))"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
