"use client";

import { useEffect, useState } from "react";
import { deletePost } from "../_actions/posts";
import toast from "react-hot-toast";

const DeletePost = ({ postId }: { postId: string }) => {
  const [state, setState] = useState<{
    status: number | null;
    message: string;
    pending: boolean;
  }>({ status: null, message: "", pending: false });

  const handleDeletePost = async (postId: string) => {
    setState((prev) => ({ ...prev, pending: true }));
    try {
      const res = await deletePost(postId);

      setState((prev) => ({
        ...prev,
        message: res.message,
        status: res.status,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setState((prev) => ({ ...prev, pending: false }));
    }
  };

  useEffect(() => {
    if (state.message && state.status && !state.pending) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <button
      type="button"
      className="button bg-red-500 text-white text-xs"
      disabled={state.pending}
      onClick={() => handleDeletePost(postId)}
    >
      {state.pending ? "deleteing..." : "Delete"}
    </button>
  );
};

export default DeletePost;
