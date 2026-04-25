"use client";

import Link from "next/link";

const EditPostForm = () => {
  return (
    <form className="w-full card max-w-lg grid gap-6">
      <div className="grid gap-2 5">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="input"
          placeholder="Enter Title To Update..."
        />
      </div>

      <div className="grid gap-2 5">
        <label htmlFor="body">Body</label>
        <textarea
          name="body"
          id="body"
          placeholder="Enter Body To Update..."
          className="input h-30 resize-none"
        />
      </div>

      <div className="flex gap-2 justify-end items-center">
        <Link
          href={"/"}
          className="button ring ring-blue-500 hover:bg-blue-500 hover:text-white"
        >
          Cancel
        </Link>

        <button type="submit" className="button bg-blue-500 text-white">
          Update
        </button>
      </div>
    </form>
  );
};

export default EditPostForm;
