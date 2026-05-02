"use client";

import { updatePost } from "@/app/posts/_actions/posts";
import UploadImage from "@/app/posts/_components/UploadImage";
import { Post } from "@/types/post";
import Link from "next/link";
import { useActionState, useState } from "react";

const EditPostForm = ({ post }: { post: Post }) => {
  const [selectedImage, setSelectedImage] = useState<string>("");

  const initialState = {
    errors: {},
    values: {
      title: post.title,
      body: post.body,
    },
  };

  const [state, action, pending] = useActionState(
    updatePost.bind(null, post.id),
    initialState,
  );

  const getString = (value: FormDataEntryValue | undefined | null) => {
    if (!value) return "";
    return typeof value === "string" ? value : value.toString();
  };

  return (
    <form className="w-full card max-w-lg grid gap-6" action={action}>
      <div>
        <UploadImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </div>

      <div className="grid gap-2 5">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="input"
          placeholder="Enter Title To Update..."
          defaultValue={getString(state?.values?.title) ?? post.title}
        />
        {state?.errors.title && (
          <p className="text-red-500 italic font-medium">
            {state?.errors.title}
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
          defaultValue={getString(state?.values?.body) ?? post.body}
        />
        {state?.errors.body && (
          <p className="text-red-500 italic font-medium">
            {state?.errors.body}
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
