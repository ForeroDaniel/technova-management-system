import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function ChartContainer() {
    return (
        <div className="w-full max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-4 h-[800px]">
            <Card>
                <CardHeader>
                    <CardTitle>Card 1</CardTitle>
                    <CardDescription>Card 1 description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card 1 content</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Card 2</CardTitle>
                    <CardDescription>Card 2 description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card 2 content</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Card 3</CardTitle>
                    <CardDescription>Card 3 description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card 3 content</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Card 4</CardTitle>
                    <CardDescription>Card 4 description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card 4 content</p>
                </CardContent>
            </Card>
        </div>
    )
}