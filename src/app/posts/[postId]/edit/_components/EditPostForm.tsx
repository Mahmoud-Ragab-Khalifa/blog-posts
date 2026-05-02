"use client";

import { updatePost } from "@/app/posts/_actions/posts";
import UploadImage from "@/app/posts/_components/UploadImage";
import { ActionState } from "@/types/actionState";
import { Post } from "@/types/post";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditPostForm = ({ post }: { post: Post }) => {
  const [selectedImage, setSelectedImage] = useState<string>(post.image);

  const formData = new FormData();

  Object.entries(post).forEach(([Key, value]) => {
    if (value !== null && value !== undefined && Key !== "image") {
      formData.append(Key, value.toString());
    }
  });

  const initialState: ActionState = {
    errors: {},
    status: null,
    message: "",
    formData,
  };

  const [state, action, pending] = useActionState(
    updatePost.bind(null, post),
    initialState,
  );

  useEffect(() => {
    if (state.message && state.status && !pending) {
      if (state.status === 200) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state.message, state.status, pending]);

  return (
    <form className="w-full card max-w-lg grid gap-6" action={action}>
      <div>
        <UploadImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />

        {state.errors?.image && (
          <p className="text-red-500 italic font-medium mt-2.5">
            {state.errors?.image}
          </p>
        )}
      </div>

      <div className="grid gap-2 5">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="input"
          placeholder="Enter Title To Update..."
          defaultValue={(state.formData?.get("title") as string) ?? post.title}
        />
        {state.errors?.title && (
          <p className="text-red-500 italic font-medium">
            {state.errors?.title}
          </p>
        )}
      </div>

      <div className="grid gap-2 5">
        <label htmlFor="body">Body</label>
        <textarea
          name="body"
          id="body"
          placeholder="Enter Body To Update..."
          className="input h-30 resize-none"
          defaultValue={(state.formData?.get("body") as string) ?? post.body}
        />
        {state.errors?.body && (
          <p className="text-red-500 italic font-medium">
            {state.errors?.body}
          </p>
        )}
      </div>

      <div className="flex gap-2 justify-end items-center">
        <Link
          href={"/"}
          className="button ring ring-blue-500 hover:bg-blue-500 hover:text-white"
        >
          Cancel
        </Link>

        <button
          type="submit"
          className="button bg-blue-500 text-white"
          disabled={pending}
        >
          {pending ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default EditPostForm;
