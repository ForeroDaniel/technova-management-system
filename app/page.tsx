import Navbar from "@/components/Navbar";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Navbar />
      <h1>Hello World</h1>
    </div>
  );
}
