/**
 * Navigation Bar Component
 * 
 * This component serves as the main navigation interface of the application.
 * It implements a tabbed interface that allows users to switch between different sections:
 * - Activities: Displays the activities management interface
 * - Projects: Shows the projects management interface
 * - Employees: Presents the employees management interface
 * 
 * The component uses the shadcn/ui Tabs components for the tabbed interface and
 * maintains a responsive layout with proper spacing and centering.
 * 
 * @component
 * @returns {JSX.Element} The rendered navigation bar with tabbed content
 */

import Activities from "./activities/Activities";
import Employees from '@/components/employees/Employees';
import Projects from '@/components/projects/Projects';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function Navbar() {
  return (
    <Tabs defaultValue="activities" className="w-full max-w-[1000px] mx-auto flex flex-col min-h-screen">
      <div className="w-full bg-background">
        <div className="flex justify-center py-14">
          <TabsList className="h-10">
            <TabsTrigger value="activities">Actividades</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="employees">Empleados</TabsTrigger>
          </TabsList>
        </div>
      </div>
      <div className="flex-1 p-4">
        <TabsContent value="activities" className="h-full">
          <Activities/>
        </TabsContent>
        <TabsContent value="projects" className="h-full">
          <Projects/>
        </TabsContent>
        <TabsContent value="employees" className="h-full">
          <Employees/>
        </TabsContent>
      </div>
    </Tabs>
  );
}
