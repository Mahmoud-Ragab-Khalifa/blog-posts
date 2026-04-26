"use client";

import { updatePost } from "@/app/posts/_actions/posts";
import Link from "next/link";
import { useActionState } from "react";

const EditPostForm = ({ id }: { id: string }) => {
  const [error, action, pending] = useActionState(
    updatePost.bind(null, id),
    {},
  );

  return (
    <form className="w-full card max-w-lg grid gap-6" action={action}>
      <div className="grid gap-2 5">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="input"
          placeholder="Enter Title To Update..."
        />
        {error.title && (
          <p className="text-red-500 italic font-medium">{error.title}</p>
        )}
      </div>

      <div className="grid gap-2 5">
        <label htmlFor="body">Body</label>
        <textarea
          name="body"
          id="body"
          placeholder="Enter Body To Update..."
          className="input h-30 resize-none"
        />
        {error.body && (
          <p className="text-red-500 italic font-medium">{error.body}</p>
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
          Update
        </button>
      </div>
    </form>
  );
};

export default EditPostForm;
