
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function Navbar() {
    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="activities">Actividades</TabsTrigger>
                <TabsTrigger value="projects">Proyectos</TabsTrigger>
                <TabsTrigger value="employees">Empleados</TabsTrigger>
            </TabsList>
            <TabsContent value="activities">estas son las actividades.</TabsContent>
            <TabsContent value="projects">estos son los proyectos.</TabsContent>
            <TabsContent value="employees">estos son los empleados.</TabsContent>
        </Tabs>
    )
}
