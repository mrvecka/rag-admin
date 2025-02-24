import { z } from "zod";

export const AvailableApplicationStatuses = [
  "active",
  "disabled",
  "testing",
] as const;
export type ApplicationStatus = (typeof AvailableApplicationStatuses)[number];

export const applicationFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  identifier: z.string(),
  status: z.enum(AvailableApplicationStatuses),
  use_multi_query: z.boolean(),
});
