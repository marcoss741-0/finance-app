import { CardContent } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Skeleton } from "@/app/_components/ui/skeleton";

export default function LastTransactionsSkeleton() {
  return (
    <ScrollArea className="rounded-md border bg-[#1d1c1c]">
      <CardContent className="space-y-6 p-6">
        {/* Título + Botão */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>

        {/* Lista de transações simuladas */}
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4">
              {/* Ícone */}
              <Skeleton className="h-10 w-10 rounded-md" />

              {/* Texto da transação */}
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>

              {/* Valor */}
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </ScrollArea>
  );
}
