import { z } from "zod";

export const addPostSchema = z.object({
  title: z.string().trim().min(1, { message: "Post Title Is Required!" }),
  body: z.string().trim().min(1, { message: "Post Body Is Required!" }),
});

export const updatePostSchema = z.object({
  title: z.string().trim().min(1, { message: "Add Post Title To Update!" }),
  body: z.string().trim().min(1, { message: "Add Post Body To Update!" }),
});
