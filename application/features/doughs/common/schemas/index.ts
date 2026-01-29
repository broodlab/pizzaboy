import { z } from "zod/v4";
import { nameMaxLength } from "~/configs/schema-rules";

export const doughNameSchema = z.string().max(nameMaxLength);

export const doughSchema = z.object({
  name: doughNameSchema,
});
