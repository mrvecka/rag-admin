"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface ApproveDialogProps {
  message: string;
  trigger: React.ReactNode;
  tooltip: string;
  onClose?: (approved: boolean) => void;
}

export default function ApproveDialog({
  message,
  trigger,
  tooltip,
  onClose,
}: ApproveDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClose = () => {
    setOpen(false);
    onClose?.(false);
  };

  const handleApprove = () => {
    startTransition(async () => {
      setOpen(false);
      onClose?.(true);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogTitle>Confirm action</DialogTitle>
        <p>{message}</p>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={isPending} onClick={handleApprove}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
