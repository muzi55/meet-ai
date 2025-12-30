"use client";

import { ErrorState } from "@/app/_components/error-state";

export default function ErrorPage() {
  return (
    <ErrorState
      title="Error loading agents"
      description="There was an error while loading the agents."
    />
  );
}
