/**
 * useApiData Hook
 * 
 * A custom hook that provides centralized data fetching and management for:
 * - Employees (empleados)
 * - Projects (proyectos)
 * - Activities (actividades)
 * 
 * Features:
 * - Automatic data fetching and caching using SWR
 * - Computed statistics for projects and employees
 * - Data refresh functionality
 * - Type-safe data handling
 * - Error and loading states
 */

'use client'

import useSWR from 'swr'
import { mutate } from 'swr'

// Types from your existing code
import type { Employee, Project, Activity } from '@/types'

/**
 * Base fetcher function for SWR
 * Handles the common fetch logic and error checking
 */
const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch data')
  const json = await res.json()
  return json.data
}

/**
 * Hook for fetching employees data
 * Returns employees array with loading and error states
 */
export function useEmployees() {
  const { data, error, isLoading } = useSWR<Employee[]>('/api/employees', fetcher)
  return {
    employees: data ?? [],
    isLoading,
    error
  }
}

/**
 * Hook for fetching projects data
 * Returns projects array with loading and error states
 */
export function useProjects() {
  const { data, error, isLoading } = useSWR<Project[]>('/api/projects', fetcher)
  return {
    projects: data ?? [],
    isLoading,
    error
  }
}

/**
 * Hook for fetching activities data
 * Returns activities array with loading and error states
 */
export function useActivities() {
  const { data, error, isLoading } = useSWR<Activity[]>('/api/activities', fetcher)
  return {
    activities: data ?? [],
    isLoading,
    error
  }
}

/**
 * Main hook that combines all data and provides computed statistics
 * 
 * Returns:
 * - Raw data (employees, projects, activities)
 * - Loading and error states
 * - Computed project statistics (totalHours, activityCount)
 * - Computed employee statistics (totalHours, projectCount)
 * - Data refresh function
 */
export function useAppDataSWR() {
  // Fetch all data using individual hooks
  const { employees, isLoading: employeesLoading, error: employeesError } = useEmployees()
  const { projects, isLoading: projectsLoading, error: projectsError } = useProjects()
  const { activities, isLoading: activitiesLoading, error: activitiesError } = useActivities()

  // Combine loading and error states
  const isLoading = employeesLoading || projectsLoading || activitiesLoading
  const error = employeesError || projectsError || activitiesError

  /**
   * Refresh all data simultaneously
   * Useful after mutations (create/update/delete)
   */
  const refreshData = async () => {
    await Promise.all([
      mutate('/api/employees'),
      mutate('/api/projects'),
      mutate('/api/activities')
    ])
  }

  /**
   * Calculate statistics for each project:
   * - Total hours spent
   * - Number of activities
   */
  const projectStats = projects.map((project: Project) => ({
    ...project,
    totalHours: activities
      .filter((a: Activity) => a.proyecto_id === project.id)
      .reduce((acc: number, curr: Activity) => acc + (curr.minutos / 60), 0),
    activityCount: activities
      .filter((a: Activity) => a.proyecto_id === project.id)
      .length
  }))

  /**
   * Calculate statistics for each employee:
   * - Total hours worked
   * - Number of unique projects
   */
  const employeeStats = employees.map((employee: Employee) => ({
    ...employee,
    totalHours: activities
      .filter((a: Activity) => a.empleado_id === employee.id)
      .reduce((acc: number, curr: Activity) => acc + (curr.minutos / 60), 0),
    projectCount: new Set(activities
      .filter((a: Activity) => a.empleado_id === employee.id)
      .map(a => a.proyecto_id))
      .size
  }))

  return {
    // Raw data
    employees,
    projects,
    activities,
    // States
    isLoading,
    error,
    // Computed stats
    projectStats,
    employeeStats,
    // Actions
    refreshData
  }
} 