import { atom, useAtom, useAtomValue } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

interface Employee {
  id: number
  nombre: string
}

interface Project {
  id: number
  nombre: string
}

// Base atoms for our data
const employeesAtom = atomWithStorage<Employee[]>('employees', [])
const projectsAtom = atomWithStorage<Project[]>('projects', [])
const isLoadingAtom = atom<boolean>(false)
const errorAtom = atom<string | null>(null)
const hasInitializedAtom = atomWithStorage('hasInitialized', false)

// Derived atom for fetching data
const fetchDataAtom = atom(
  null, // read function (null since this is a write-only atom)
  async (get, set) => {
    // If already initialized or loading, don't fetch
    if (get(hasInitializedAtom) || get(isLoadingAtom)) {
      return
    }

    set(isLoadingAtom, true)
    set(errorAtom, null)

    try {
      const [employeesRes, projectsRes] = await Promise.all([
        fetch('/api/employees'),
        fetch('/api/projects')
      ])

      if (!employeesRes.ok || !projectsRes.ok) {
        throw new Error('Failed to fetch data')
      }

      const employeesData = await employeesRes.json()
      const projectsData = await projectsRes.json()

      set(employeesAtom, employeesData.data)
      set(projectsAtom, projectsData.data)
      set(hasInitializedAtom, true)
    } catch (error) {
      set(errorAtom, (error as Error).message)
      console.error('Error fetching data:', error)
    } finally {
      set(isLoadingAtom, false)
    }
  }
)

// Custom hook to use the shared data
export function useSharedData() {
  const [employees] = useAtom(employeesAtom)
  const [projects] = useAtom(projectsAtom)
  const [isLoading] = useAtom(isLoadingAtom)
  const [error] = useAtom(errorAtom)
  const [hasInitialized] = useAtom(hasInitializedAtom)
  const [, fetchData] = useAtom(fetchDataAtom)

  return {
    employees,
    projects,
    isLoading,
    error,
    hasInitialized,
    fetchData
  }
}

// Optional: Export individual atoms if needed elsewhere
export {
  employeesAtom,
  projectsAtom,
  isLoadingAtom,
  errorAtom,
  hasInitializedAtom
} 