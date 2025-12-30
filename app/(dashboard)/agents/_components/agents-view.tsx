"use client";

import { useTRPC } from "@/app/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function AgentsView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions()
  );

  // if (isLoading) {
  //   return (
  //     <LoadingState
  //       title="Loading agents"
  //       description="Please wait while we load the agents."
  //     />
  //   );
  // }

  // if (isError) {
  //   return (
  //     <ErrorState
  //       title="Error loading agents"
  //       description="There was an error while loading the agents."
  //     />
  //   );
  // }

  return (
    <div>
      <h2>agents-view</h2>
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
