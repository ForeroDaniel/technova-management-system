/**
 * Home Page Component
 * 
 * This is the main page component of the application that serves as the root route (/).
 * It provides a centered layout that displays the main navigation bar component.
 * 
 * @component
 * @returns {JSX.Element} The rendered home page with navigation
 */

import ChartContainer from "@/components/charts/chart-container";
import TabsComponent from "@/components/tabs";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <ChartContainer />
      <TabsComponent />
    </div>
  );
}
