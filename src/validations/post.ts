import { z } from "zod";

const imageValidation = (isRequired: boolean) => {
  return !isRequired
    ? z.custom((value) => value instanceof File)
    : z.custom(
        (value) => {
          if (typeof value !== "object" || !value || !(value instanceof File)) {
            return false;
          }

          const validMimeTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/webp",
          ];

          return validMimeTypes.includes(value.type);
        },

        {
          message: "Post Image Is Required!",
        },
      );
};

export const addPostSchema = z.object({
  title: z.string().trim().min(1, { message: "Post Title Is Required!" }),
  body: z.string().trim().min(1, { message: "Post Body Is Required!" }),
  image: imageValidation(true),
});

export const updatePostSchema = z.object({
  title: z.string().trim().min(1, { message: "Add Post Title To Update!" }),
  body: z.string().trim().min(1, { message: "Add Post Body To Update!" }),
  image: imageValidation(false),
});
