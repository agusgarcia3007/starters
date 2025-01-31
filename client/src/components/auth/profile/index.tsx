"use client";

import { useLogoutMutation } from "@/services/auth/mutations";
import { useProfileQuery } from "@/services/auth/query";
import { ProfileSkeleton } from "./skeleton";
import { Button } from "@/components/ui/button";

export function Profile() {
  const { data, isLoading } = useProfileQuery();
  const { mutate: logout, isPending } = useLogoutMutation();

  if (isLoading) {
    return <ProfileSkeleton />;
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
