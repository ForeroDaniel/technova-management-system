'use client'

import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import { useAppDataSWR } from "@/hooks/useApiData";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

export default function Card1() {
    const { projects, activities, employees } = useAppDataSWR();

    // Calculate total cost per project
    const projectCosts = projects.map(project => {
        const projectActivities = activities.filter(a => a.proyecto_id === project.id);
        const totalCost = projectActivities.reduce((acc, activity) => {
            const employee = employees.find(e => e.id === activity.empleado_id);
            if (!employee) return acc;
            
            // Formula: (minutos / 60) * costo_por_hora
            const activityCost = (activity.minutos / 60) * employee.costo_por_hora;
            return acc + activityCost;
        }, 0);

        return {
            name: project.nombre,
            cost: parseFloat(totalCost.toFixed(2)),
        };
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Costo total por proyecto</CardTitle>
                <CardDescription>Costo de todas las actividades asociadas a un proyecto</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={projectCosts}>
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
                        <Bar
                            dataKey="cost"
                            radius={[4, 4, 0, 0]}
                            fill="hsl(var(--chart-1))"
                        />
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

