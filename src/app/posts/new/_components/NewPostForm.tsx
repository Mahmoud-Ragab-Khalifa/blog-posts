"use client";

import { createNewPost } from "../../_actions/posts";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import UploadImage from "../../_components/UploadImage";
import { ValidationErrors } from "@/types/validationErrors";
import toast from "react-hot-toast";

const NewPostForm = () => {
  const formData = new FormData();

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

  const [selectedImage, setSelectedImage] = useState("");

  const [state, action, pending] = useActionState(createNewPost, initialState);

  useEffect(() => {
    if (state.message && state.status && !pending) {
      if (state.status === 201) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state.message, state.status, pending]);

  return (
    <form className="w-full max-w-lg card grid gap-6" action={action}>
      <div>
        <UploadImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />

        {state.error?.image && (
          <p className="text-red-500 font-medium italic mt-2.5">
            {state.error?.image}
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
