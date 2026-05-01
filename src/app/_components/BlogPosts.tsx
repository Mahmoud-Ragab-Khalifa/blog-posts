"use client";

import { useSearch } from "@/contexts/SearchContext";
import { Post } from "@/types/post";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeletePost from "../posts/_components/DeletePost";
import Image from "next/image";

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
      {filteredPosts && filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div key={post.id} className="card">
            <div className="relative w-full h-50 rounded-md">
              <Image
                src={post.image}
                alt="Post-Image"
                fill
                className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
              />
            </div>
            <h1 className="font-medium text-xl">{post.title}</h1>
            <p className="my-2 line-clamp-1">{post.body}</p>
            <div className="flex items-center justify-between">
              <Link
                href={`/posts/${post.id}`}
                className="text-sm font-medium text-blue-500"
              >
                Read More
              </Link>

              <div className="flex items-center gap-2">
                <Link
                  href={`/posts/${post.id}/edit`}
                  className="button bg-green-500 text-white text-xs"
                >
                  Edit
                </Link>

                <DeletePost postId={post.id} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-sm font-medium text-neutral-500 italic">
          No Posts Found Add New Posts To Show
        </p>
      )}
    </div>
  );
};

export default BlogPosts;
