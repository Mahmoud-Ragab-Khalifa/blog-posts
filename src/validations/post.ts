import { z } from "zod";

export const addPostSchema = z.object({
  title: z.string().trim().min(1, { message: "Post Title Is Required!" }),
  body: z.string().trim().min(1, { message: "Post Body Is Required!" }),
});
