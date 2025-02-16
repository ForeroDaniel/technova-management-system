import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div className={cn("flex items-center justify-center min-h-[400px]", className)} {...props}>
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
} 