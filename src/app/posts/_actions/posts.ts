"use server";

import { addPostSchema, updatePostSchema } from "@/validations/post";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createNewPost = async (prevState: unknown, formData: FormData) => {
  const result = addPostSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed To Create Post");
  }

  revalidatePath("/");
  redirect("/");
};

export const updatePost = async (
  id: string,
  prevState: unknown,
  formData: FormData,
) => {
  const values = Object.fromEntries(formData.entries());

  const result = updatePostSchema.safeParse(values);

  if (result.success === false) {
    return {
      errors: result.error.formErrors.fieldErrors,
      values,
    };
  }

  const data = result.data;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed To Update Post");
  }

  revalidatePath("/");
  revalidatePath(`/posts/${id}/edit`);
  redirect("/");
};
