"use client";

import { useSearch } from "@/contexts/SearchContext";
import { Post } from "@/types/post";
import Link from "next/link";
import { useEffect, useState } from "react";

const BlogPosts = ({ posts }: { posts: Post[] }) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const { searchTerm } = useSearch();

  useEffect(() => {
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredPosts(filteredPosts);
  }, [posts, searchTerm]);

  return (
    <div className="grid gap-4">
      {filteredPosts.map((post) => (
        <div key={post.id} className="card">
          <h1 className="font-medium text-xl">{post.title}</h1>
          <p className="my-2 line-clamp-1">{post.body}</p>
          <div className="flex items-center justify-between">
            <Link
              href={`/posts/${post.id}`}
              className="text-sm font-medium text-blue-500"
            >
              Read More
            </Link>

            <Link
              href={`/posts/${post.id}/edit`}
              className="button bg-green-500 text-white text-xs"
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;
