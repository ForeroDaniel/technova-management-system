'use client'

import useSWR from 'swr'
import { mutate } from 'swr'

// Types from your existing code
import type { Employee, Project, Activity } from '@/types'

// Base fetcher function
const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch data')
  const json = await res.json()
  return json.data
}

// Custom hooks for each entity type
export function useEmployees() {
  const { data, error, isLoading } = useSWR<Employee[]>('/api/employees', fetcher)
  return {
    employees: data ?? [],
    isLoading,
    error
  }
}

export function useProjects() {
  const { data, error, isLoading } = useSWR<Project[]>('/api/projects', fetcher)
  return {
    projects: data ?? [],
    isLoading,
    error
  }
}

export function useActivities() {
  const { data, error, isLoading } = useSWR<Activity[]>('/api/activities', fetcher)
  return {
    activities: data ?? [],
    isLoading,
    error
  }
}

// Combined hook for all data
export function useAppDataSWR() {
  const { employees, isLoading: employeesLoading, error: employeesError } = useEmployees()
  const { projects, isLoading: projectsLoading, error: projectsError } = useProjects()
  const { activities, isLoading: activitiesLoading, error: activitiesError } = useActivities()

  const isLoading = employeesLoading || projectsLoading || activitiesLoading
  const error = employeesError || projectsError || activitiesError

  // Mutation helpers
  const refreshData = async () => {
    await Promise.all([
      mutate('/api/employees'),
      mutate('/api/projects'),
      mutate('/api/activities')
    ])
  }

  // Computed stats (using your existing logic)
  const projectStats = projects.map((project: Project) => ({
    ...project,
    totalHours: activities
      .filter((a: Activity) => a.proyecto_id === project.id)
      .reduce((acc: number, curr: Activity) => acc + (curr.minutos / 60), 0),
    activityCount: activities.filter((a: Activity) => a.proyecto_id === project.id).length
  }))

  const employeeStats = employees.map((employee: Employee) => ({
    ...employee,
    totalHours: activities
      .filter((a: Activity) => a.empleado_id === employee.id)
      .reduce((acc: number, curr: Activity) => acc + (curr.minutos / 60), 0),
    projectCount: new Set(activities
      .filter((a: Activity) => a.empleado_id === employee.id)
      .map(a => a.proyecto_id)).size
  }))

  return {
    employees,
    projects,
    activities,
    isLoading,
    error,
    projectStats,
    employeeStats,
    refreshData
  }
} 