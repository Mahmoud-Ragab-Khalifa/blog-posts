import { getPost, getPosts } from "@/lib/api";
import { Post } from "@/types/post";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  const posts: Post[] = await getPosts();

  return posts.map((post) => ({ postId: post.id }));
}

const PostPage = async ({
  params,
}: {
  params: Promise<{ postId: number }>;
}) => {
  const { postId } = await params;

  const post: Post = await getPost(postId);

  if (!post) {
    redirect("/");
  }

  return (
    <main>
      <section className="section-gap">
        <div className="container">PostPage {postId}</div>
      </section>
    </main>
  );
};

export default PostPage;
