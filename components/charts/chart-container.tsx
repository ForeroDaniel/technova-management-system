import Card1 from "@/components/charts/card-1"
import Card2 from "@/components/charts/card-2"
import Card3 from "@/components/charts/card-3"
import Card4 from "@/components/charts/card-4"

export default function ChartContainer() {
    return (
        <div className="w-full max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-4 h-[1020px]">
            <Card1 />
            <Card2 />
            <Card3 />
            <Card4 />
            
        </div>
    )
}