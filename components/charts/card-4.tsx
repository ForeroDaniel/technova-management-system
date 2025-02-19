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
    TooltipProps,
} from "recharts";

export default function Card4() {
    const { activities, employees } = useAppDataSWR();

    // Function to get week number from date
    const getWeekNumber = (date: string) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart = new Date(d.getFullYear(), 0, 1);
        const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
        return `Semana ${weekNo}`;
    };

    // First, get all unique weeks
    const uniqueWeeks = [...new Set(activities.map(a => getWeekNumber(a.fecha)))].sort((a, b) => {
        const weekA = parseInt(a.split(' ')[1]);
        const weekB = parseInt(b.split(' ')[1]);
        return weekA - weekB;
    });

    // Group activities by employee and week
    const workloadByEmployee = employees.map(employee => {
        const employeeActivities = activities.filter(a => a.empleado_id === employee.id);
        const weeklyHours = uniqueWeeks.reduce((acc, week) => {
            const activitiesInWeek = employeeActivities.filter(a => getWeekNumber(a.fecha) === week);
            const totalHours = activitiesInWeek.reduce((sum, activity) => sum + activity.minutos / 60, 0);
            return {
                ...acc,
                [week]: parseFloat(totalHours.toFixed(2))
            };
        }, {});

        return {
            name: employee.nombre,
            ...weeklyHours,
            total: parseFloat(
                (employeeActivities.reduce((sum, activity) => sum + activity.minutos / 60, 0)).toFixed(2)
            )
        };
    });

    // Generate colors for each week
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
                                                    <div className="border-t pt-1 mt-1">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                Total
                                                            </span>
                                                            <span className="font-bold">
                                                                {payload.reduce((sum, entry) => sum + (entry.value || 0), 0).toFixed(1)}h
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
