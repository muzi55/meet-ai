"use client";

import { ResponsiveDialog } from "../responsive-dialog";

export function NewAgentDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create New Agent"
      description="Fill in the details to create a new agent.">
      new Agent Form
    </ResponsiveDialog>
  );
}
