"use client";

import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/services/auth/mutations";
import { useProfileQuery } from "@/services/auth/query";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProtectedPage() {
  const { data, isLoading } = useProfileQuery();
  const { mutate: logout, isPending } = useLogoutMutation();

  if (isLoading) {
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

  return (
    <div className="py-10">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Welcome, {data?.user.name}!</h1>
          <Button
            variant="destructive"
            onClick={() => logout()}
            isLoading={isPending}
          >
            Logout
          </Button>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Your Profile</h2>
          <div className="space-y-1">
            <p>
              <span className="font-medium">Email:</span> {data?.user.email}
            </p>
            <p>
              <span className="font-medium">Name:</span> {data?.user.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
