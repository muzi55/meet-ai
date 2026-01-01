"use client";
import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

interface DashboardCommandProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function DashboardCommand({
  open,
  setOpen,
}: DashboardCommandProps) {
  return (
    <CommandResponsiveDialog
      open={open}
      onOpenChange={setOpen}>
      <CommandInput />
      <CommandList>
        <CommandItem>test</CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  );
}
