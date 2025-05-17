import { Card, CardContent } from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";

export default function ExpensesPerCategorySkeleton() {
  return (
    <Card className="col-span-2 h-full rounded-md border pb-6">
      <CardContent className="space-y-6 p-6">
        {/* Título */}
        <Skeleton className="h-6 w-1/3" />

        {/* Categoria 1 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-10" />
          </div>
          <Skeleton className="h-3 w-full rounded-full" />
        </div>

        {/* Categoria 2 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-10" />
          </div>
          <Skeleton className="h-3 w-3/4 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
