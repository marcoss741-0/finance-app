import { Skeleton } from "@/app/_components/ui/skeleton";

export default function SummarySkeleton() {
  return (
    <div className="space-y-6">
      {/* Card grande (Saldo) */}
      <div className="flex items-center justify-between rounded-xl border bg-muted/30 p-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="h-8 w-32 rounded-full" />
      </div>

      {/* Cards pequenos (Investido, Receita, Despesas) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2 rounded-xl border bg-muted/30 p-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-28" />
          </div>
        ))}
      </div>
    </div>
  );
}
