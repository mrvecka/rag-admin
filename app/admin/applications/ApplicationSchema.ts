import { z } from "zod";

export const applicationSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  identifier: z.string(),
  status: z.enum(["active", "disabled"]),
  use_multi_query: z.boolean(),
});
