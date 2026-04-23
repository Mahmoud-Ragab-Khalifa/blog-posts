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
