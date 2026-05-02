"use server";

import { getImageUrl } from "@/lib/getImageUrl";
import { Post } from "@/types/post";
import { addPostSchema, updatePostSchema } from "@/validations/post";
import { revalidatePath } from "next/cache";

export const createNewPost = async (prevState: unknown, formData: FormData) => {
  const result = addPostSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
      formData,
    };
  }

  const data = result.data;

  const imageFile = data.image as File;
  const imageUrl = Boolean(imageFile.size)
    ? await getImageUrl(imageFile)
    : undefined;

  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, image: imageUrl }),
    });

    revalidatePath("/");

    return {
      message: "Post Added Sucessfully",
      status: 201,
    };
  } catch (error) {
    console.error(error);

    return {
      message: "Failed To Add Post",
      status: 500,
    };
  }
};

export const updatePost = async (
  post: Post,
  prevState: unknown,
  formData: FormData,
) => {
  const result = updatePostSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) {
    return {
      errors: result.error.formErrors.fieldErrors,
      status: 400,
      formData,
    };
  }

  const data = result.data;

  const imageFile = data.image as File;
  const imageUrl = Boolean(imageFile.size)
    ? await getImageUrl(imageFile)
    : undefined;

  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, image: imageUrl ?? post.image }),
    });

    revalidatePath("/");
    revalidatePath(`/posts/${post.id}/edit`);

    return {
      message: "Post Updated Sucessfully",
      status: 200,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Failed To Update Post",
      status: 400,
    };
  }
};

export const deletePost = async (postId: string) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postId}`, {
      method: "DELETE",
    });

    revalidatePath("/");

    return {
      message: "Post Deleted Sucessfully",
      status: 200,
    };
  } catch (error) {
    console.error(error);

    return {
      message: "Failed To Delete Post Try Again",
      status: 500,
    };
  }
};
