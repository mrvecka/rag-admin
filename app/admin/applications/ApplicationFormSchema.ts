import { AvailableApplicationStatuses } from "@/lib/db/applications";
import { z } from "zod";

export const applicationFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  identifier: z.string(),
  status: z.enum(AvailableApplicationStatuses),
  use_multi_query: z.boolean(),
});
