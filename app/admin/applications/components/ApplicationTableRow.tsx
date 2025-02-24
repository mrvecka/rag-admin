import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { TableCell, TableRow } from "@/components/ui/table";
import { Application } from "@/lib/db/applications";
import {
  Ban,
  CircleCheckBig,
  CirclePlay,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import {
  deleteApplicationAction,
  toggleApplicationStatusAction,
} from "../actions";
import ApproveDialog from "@/components/ApproveDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { isActionError } from "@/lib/utils";
import { ApplicationFormSheet } from "./ApplicationFormSheet";

export function ApplicationTableRow({
  application,
}: {
  application: Application;
}) {
  const isApplicationActive = application.status === "active";

  const handleDeleteAction = async (approved: boolean) => {
    "use server";
    if (approved) {
      const result = await deleteApplicationAction(application.id);
      if (isActionError(result)) {
        console.log(result.error);
      }
    }
  };

  const handleStatusToggleAction = async (approved: boolean) => {
    "use server";
    if (approved) {
      await toggleApplicationStatusAction(
        application.id,
        isApplicationActive ? "disabled" : "active"
      );
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{application.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {application.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {application.identifier}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {application.use_multi_query ? (
          <CircleCheckBig color="green" size={20} />
        ) : (
          <X color="red" size={20} />
        )}
      </TableCell>

      <TableCell className="flex gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <ApplicationFormSheet
              title="Edit Application"
              application={application}
              trigger={
                <Button variant="ghost" size="icon">
                  <Pencil size={20} />
                </Button>
              }
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit application</p>
          </TooltipContent>
        </Tooltip>

        <ApproveDialog
          onClose={handleStatusToggleAction}
          message={`Are you sure you want to ${isApplicationActive ? "disable" : "enable"} ${application.name} application?`}
          tooltip={
            isApplicationActive ? "Disable application" : "Enable application"
          }
          trigger={
            <Button variant="ghost" size="icon">
              {isApplicationActive ? (
                <Ban size={20} />
              ) : (
                <CirclePlay size={20} />
              )}
            </Button>
          }
        />
        <ApproveDialog
          onClose={handleDeleteAction}
          message={`Are you sure you want to delete ${application.name} application?`}
          tooltip="Delete application"
          trigger={
            <Button variant="ghost" size="icon">
              <Trash2 color="red" size={20} />
            </Button>
          }
        />
      </TableCell>
    </TableRow>
  );
}
