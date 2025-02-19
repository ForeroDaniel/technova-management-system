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
    Legend,
} from "recharts";

export default function Card2() {
    const { projects, activities, employees } = useAppDataSWR();

    // Calculate budget vs cost data for each project
    const projectComparison = projects.map(project => {
        const projectActivities = activities.filter(a => a.proyecto_id === project.id);
        const totalCost = projectActivities.reduce((acc, activity) => {
            const employee = employees.find(e => e.id === activity.empleado_id);
            if (!employee) return acc;
            
            // Formula: (minutos / 60) * costo_por_hora
            const activityCost = (activity.minutos / 60) * employee.costo_por_hora;
            return acc + activityCost;
        }, 0);

        // Calculate gross profitability
        const grossProfitability = project.presupuesto - totalCost;

        return {
            name: project.nombre,
            presupuesto: parseFloat(project.presupuesto.toFixed(2)),
            costo: parseFloat(totalCost.toFixed(2)),
            rentabilidad: parseFloat(grossProfitability.toFixed(2))
        };
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Rentabilidad bruta</CardTitle>
                <CardDescription>Costo total del proyecto con respecto a su presupuesto</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={projectComparison}>
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
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            Presupuesto
                                                        </span>
                                                        <span className="font-bold text-muted-foreground">
                                                            ${payload[0].value}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            Costo
                                                        </span>
                                                        <span className="font-bold">
                                                            ${payload[1].value}
                                                        </span>
                                                    </div>
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
                        <Legend />
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
