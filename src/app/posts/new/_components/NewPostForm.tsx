"use client";

import { createNewPost } from "../../_actions/posts";
import Link from "next/link";
import { useActionState } from "react";

const NewPostForm = () => {
  type ValidationErrors = { [key: string]: string[] } | undefined;

  const formData = new FormData();

  Object.entries({}).forEach(([Key, value]) => {
    if (value !== null && value !== undefined && Key !== "image") {
      formData.append(Key, value.toString());
    }
  });

  type ActionState = {
    message?: string;
    error?: ValidationErrors;
    status?: number | null;
    formData?: FormData | null;
  };

  const initialState: ActionState = {
    message: "",
    error: {},
    status: null,
    formData: null,
  };

  const [state, action, pending] = useActionState(createNewPost, initialState);

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
          defaultValue={state.formData?.get("title") as string}
          autoFocus
        />
        {state.error?.title && (
          <p className="text-red-500 font-medium italic">
            {state.error?.title}
          </p>
        )}
      </div>

      <div className="grid gap-2 5">
        <label htmlFor="body">Body</label>
        <textarea
          name="body"
          id="body"
          className="input resize-none h-30"
          placeholder="Enter Post Body..."
          defaultValue={
            (state.formData?.get("body") as string) ??
            (formData.get("body") as string)
          }
        />
        {state.error?.body && (
          <p className="text-red-500 font-medium italic">{state.error?.body}</p>
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
          {pending ? "Saveing..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default NewPostForm;
