import Activities from "./Activities";
import Employees from '@/components/Employees';
import Projects from '@/components/Projects';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

/**
 * Component for the navigation bar
 * 
 * This component displays a navigation bar with tabs for different sections of the application.
 * It includes tabs for activities, projects, and employees.
 **/

export default function Navbar() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="activities">Actividades</TabsTrigger>
        <TabsTrigger value="projects">Proyectos</TabsTrigger>
        <TabsTrigger value="employees">Empleados</TabsTrigger>
      </TabsList>
      <TabsContent value="activities">
        <Activities/>
      </TabsContent>
      <TabsContent value="projects">
        <Projects/>
      </TabsContent>
      <TabsContent value="employees">
        <Employees/>
      </TabsContent>
    </Tabs>
  );
}
