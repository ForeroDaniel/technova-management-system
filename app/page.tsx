/**
 * Home Page Component
 * 
 * This is the main page component of the application that serves as the root route (/).
 * It provides a centered layout that displays the main navigation bar component.
 * 
 * @component
 * @returns {JSX.Element} The rendered home page with navigation
 */

import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Navbar />
    </div>
  );
}
