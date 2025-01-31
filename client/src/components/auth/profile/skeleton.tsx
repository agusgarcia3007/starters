import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="py-10 space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-8 w-[150px]" />
        <div className="space-y-3">
          <div className="space-y-1">
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-6 w-[200px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
