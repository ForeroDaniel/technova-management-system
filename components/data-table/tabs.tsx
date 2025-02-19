/**
 * TabsComponent
 * 
 * This component creates a tabbed interface that lets users switch between different views:
 * - Activities Tab: Shows a list of work activities
 * - Projects Tab: Shows a list of company projects
 * - Employees Tab: Shows a list of employees
 * 
 * Each tab contains a data table (EntityTable) that displays and manages its respective data.
 */

import EntityTable from "@/components/data-table/entity-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsComponent() {
  return (
    // Container for the entire tabs section, centered with max width
    <Tabs 
      defaultValue="activities" // Start by showing the Activities tab
      className="w-full max-w-[1000px] mx-auto flex flex-col"
    >
      {/* Header section containing the tab buttons */}
      <div className="w-full bg-background">
        <div className="flex justify-center pt-16 mt-16">
          {/* The actual tab buttons */}
          <TabsList className="h-10">
            <TabsTrigger value="activities">Actividades</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="employees">Empleados</TabsTrigger>
          </TabsList>
        </div>
      </div>

      {/* Content section - where the actual data tables are displayed */}
      <div className="flex-1 p-4">
        {/* Activities Table - shown when "activities" tab is selected */}
        <TabsContent value="activities" className="h-full">
          <EntityTable entityType="activities" />
        </TabsContent>

        {/* Projects Table - shown when "projects" tab is selected */}
        <TabsContent value="projects" className="h-full">
          <EntityTable entityType="projects" />
        </TabsContent>

        {/* Employees Table - shown when "employees" tab is selected */}
        <TabsContent value="employees" className="h-full">
          <EntityTable entityType="employees" />
        </TabsContent>
      </div>
    </Tabs>
  );
}
