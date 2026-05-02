import { z } from "zod";

export const addPostSchema = z.object({
  title: z.string().trim().min(1, { message: "Post Title Is Required!" }),
  body: z.string().trim().min(1, { message: "Post Body Is Required!" }),
  image: z.custom(
    (value) => {
      if (!value || typeof value !== "object" || !(value instanceof File)) {
        return false;
      }

      const validMimiTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
      ];

      return validMimiTypes.includes(value.type);
    },
    {
      message: "Post Image Is Required",
    },
  ),
});

export const updatePostSchema = z.object({
  title: z.string().trim().min(1, { message: "Add Post Title To Update!" }),
  body: z.string().trim().min(1, { message: "Add Post Body To Update!" }),
  image: z.custom(
    (value) => {
      if (!value || typeof value !== "object" || !(value instanceof File)) {
        return false;
      }

      const validMimiTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
      ];

      return validMimiTypes.includes(value.type);
    },
    {
      message: "Post Image Is Required To Update Post",
    },
  ),
});
