/**
 * Home Page Component
 * 
 * This page shows:
 * 1. Charts - Visual data displays at the top (ChartContainer)
 * 2. Data Tables - Interactive tables below for managing:
 *    - Activities
 *    - Projects
 *    - Employees
 * 
 * The layout is centered and stacked vertically.
 */

import ChartContainer from "@/components/charts/chart-container";
import TabsComponent from "@/components/data-table/tabs";
import { ProtectedPage } from "@/components/auth/protected-page";
import Logout from "@/components/auth/logout";

// Simple page that displays charts and data tables
export default function Home() {
  return (
    <ProtectedPage>
      {/* Center everything and stack vertically */}
      <div className="flex flex-col items-center">
        {/* Charts section */}
        <ChartContainer />
        
        {/* Data tables section */}
        <TabsComponent />

        {/* Logout section */}
        <Logout />
      </div>
    </ProtectedPage>
  );
}