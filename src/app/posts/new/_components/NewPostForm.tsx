"use client";

import { createNewPost } from "../../_actions/posts";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import UploadImage from "../../_components/UploadImage";
import toast from "react-hot-toast";
import { ActionState } from "@/types/actionState";

const NewPostForm = () => {
  const initialState: ActionState = {
    errors: {},
    message: "",
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

        {state.errors?.image && (
          <p className="text-red-500 font-medium italic mt-2.5">
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
          placeholder="Enter Post Title..."
          defaultValue={state.formData?.get("title") as string}
          autoFocus
        />
        {state.errors?.title && (
          <p className="text-red-500 font-medium italic">
            {state.errors?.title}
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
          defaultValue={state.formData?.get("body") as string}
        />
        {state.errors?.body && (
          <p className="text-red-500 font-medium italic">
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
          {pending ? "Saveing..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default NewPostForm;
