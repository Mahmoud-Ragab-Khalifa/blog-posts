export const getPosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`, {
    next: {
      tags: ["posts"],
      revalidate: 3600,
    },
  });

  const posts = await res.json();

  return posts;
};

export const getPost = async (postId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postId}`,
    {
      next: {
        tags: [`post-${postId}`],
        revalidate: 3600,
      },
    },
  );

  if (!res.ok) {
    return null;
  }

  const post = await res.json();

  return post;
};
