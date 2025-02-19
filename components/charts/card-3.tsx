'use client'

import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card"; 
import { useAppDataSWR } from "@/hooks/useApiData";
import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Cell,
    Legend,
    Tooltip,
} from "recharts";

export default function Card3() {
    const { projects, activities } = useAppDataSWR();

    // Calculate total hours per project
    const projectHours = projects.map(project => {
        const projectActivities = activities.filter(a => a.proyecto_id === project.id);
        const totalMinutes = projectActivities.reduce((acc, activity) => acc + activity.minutos, 0);
        const totalHours = parseFloat((totalMinutes / 60).toFixed(2));

        return {
            name: project.nombre,
            value: totalHours,
        };
    });

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
                        <Pie
                            data={projectHours}
                            innerRadius="60%"
                            outerRadius="80%"
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {projectHours.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
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
