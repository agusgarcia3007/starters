import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface ServerPrefetchProps {
  queryKey: string[];
  queryFn: () => Promise<unknown>;
  children: React.ReactNode;
}

export async function ServerPrefetch({
  queryKey,
  queryFn,
  children,
}: ServerPrefetchProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
  });

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
