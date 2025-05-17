import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Skeleton } from "@/app/_components/ui/skeleton";

const ChartSkeleton = () => {
  return (
    <ScrollArea className="flex flex-col gap-12 bg-[#1d1c1c] px-8 py-6">
      <div className="flex h-80 w-full items-center justify-center rounded-xl border bg-background">
        <div className="relative h-40 w-40 rounded-full">
          <Skeleton className="absolute inset-0 h-full w-full rounded-full" />
          <Skeleton className="absolute left-4 top-4 h-24 w-24 rounded-full bg-background" />
        </div>
      </div>
    </ScrollArea>
  );
};

export default ChartSkeleton;
