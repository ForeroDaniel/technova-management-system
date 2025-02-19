import { Activity, Employee, Project } from "@/types"

// Common type for chart data points
export interface ChartDataPoint {
    name: string
    value: number
}

/**
 * Calculates total cost of activities for a project
 */
export function calculateProjectCost(
    activities: Activity[],
    employees: Employee[]
): number {
    return activities.reduce((acc, activity) => {
        const employee = employees.find(e => e.id === activity.empleado_id)
        if (!employee) return acc
        return acc + (activity.minutos / 60) * employee.costo_por_hora
    }, 0)
}

/**
 * Generates data for project costs chart
 */
export function getProjectCostsData(
    projects: Project[],
    activities: Activity[],
    employees: Employee[]
): ChartDataPoint[] {
    return projects.map(project => ({
        name: project.nombre,
        value: parseFloat(calculateProjectCost(
            activities.filter(a => a.proyecto_id === project.id),
            employees
        ).toFixed(2))
    }))
}

/**
 * Generates data for project profitability chart
 */
export function getProjectProfitabilityData(
    projects: Project[],
    activities: Activity[],
    employees: Employee[]
) {
    return projects.map(project => {
        const totalCost = calculateProjectCost(
            activities.filter(a => a.proyecto_id === project.id),
            employees
        )
        return {
            name: project.nombre,
            presupuesto: parseFloat(project.presupuesto.toFixed(2)),
            costo: parseFloat(totalCost.toFixed(2)),
            rentabilidad: parseFloat((project.presupuesto - totalCost).toFixed(2))
        }
    })
}

/**
 * Generates data for project hours chart
 */
export function getProjectHoursData(
    projects: Project[],
    activities: Activity[]
): ChartDataPoint[] {
    return projects.map(project => ({
        name: project.nombre,
        value: parseFloat((activities
            .filter(a => a.proyecto_id === project.id)
            .reduce((acc, activity) => acc + activity.minutos, 0) / 60
        ).toFixed(2))
    }))
}

/**
 * Calculates week number for a date
 */
export function getWeekNumber(date: string): string {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() + 4 - (d.getDay() || 7))
    const yearStart = new Date(d.getFullYear(), 0, 1)
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
    return `Semana ${weekNo}`
}

/**
 * Generates data for employee workload chart
 */
export function getEmployeeWorkloadData(
    employees: Employee[],
    activities: Activity[]
) {
    // Get unique weeks
    const uniqueWeeks = [...new Set(activities.map(a => getWeekNumber(a.fecha)))].sort((a, b) => {
        const weekA = parseInt(a.split(' ')[1])
        const weekB = parseInt(b.split(' ')[1])
        return weekA - weekB
    })

    return {
        data: employees.map(employee => {
            const employeeActivities = activities.filter(a => a.empleado_id === employee.id)
            
            // Calculate hours per week
            const weeklyHours = uniqueWeeks.reduce((acc, week) => ({
                ...acc,
                [week]: parseFloat((employeeActivities
                    .filter(a => getWeekNumber(a.fecha) === week)
                    .reduce((sum, activity) => sum + activity.minutos / 60, 0)
                ).toFixed(2))
            }), {})

            return {
                name: employee.nombre,
                ...weeklyHours,
                total: parseFloat((employeeActivities
                    .reduce((sum, activity) => sum + activity.minutos / 60, 0)
                ).toFixed(2))
            }
        }),
        weeks: uniqueWeeks
    }
} 