"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ApplicationForm from "./ApplicationForm";
import { useState } from "react";
import { Application } from "@/lib/db/applications";

type ApplicationFormProps = {
  application?: Application;
  trigger: React.ReactElement;
  title: string;
};

export function ApplicationFormSheet(props: ApplicationFormProps) {
  const [open, setOpen] = useState(false);
  const { application, trigger, title } = props;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <ApplicationForm
          application={application}
          closeSheet={() => setOpen(false)}
        ></ApplicationForm>
      </SheetContent>
    </Sheet>
  );
}
