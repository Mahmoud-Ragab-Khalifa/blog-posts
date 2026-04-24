"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createNewPost } from "../../_actions/posts";
import Link from "next/link";

const NewPostForm = () => {
  const [error, action] = useFormState(createNewPost, {});

  return (
    <form className="w-full max-w-lg card grid gap-6" action={action}>
      <div className="grid gap-2 5">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="input"
          placeholder="Enter Post Title..."
        />
        {error?.title && (
          <p className="text-red-500 font-medium italic">{error?.title}</p>
        )}
      </div>

      <div className="grid gap-2 5">
        <label htmlFor="body">Body</label>
        <textarea
          name="body"
          id="body"
          className="input resize-none h-30"
          placeholder="Enter Post Body..."
        />
        {error?.body && (
          <p className="text-red-500 font-medium italic">{error?.body}</p>
        )}
      </div>

      <div className="flex gap-2 justify-end items-center">
        <Link
          href={"/"}
          className="button ring ring-blue-500 hover:bg-blue-500 hover:text-white"
        >
          Cancel
        </Link>

        <SubmitButton />
      </div>
    </form>
  );
};

export default NewPostForm;

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="button bg-blue-500 text-white"
      disabled={pending}
    >
      {pending ? "Saveing..." : "Save"}
    </button>
  );
};
