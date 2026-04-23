import { getPosts } from "@/lib/api";
import { Post } from "@/types/post";
import BlogPosts from "./_components/BlogPosts";

const HomePage = async () => {
  const posts: Post[] = await getPosts();

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <h1 className="text-center text-4xl font-bold mb-8">Blog Posts</h1>

          <BlogPosts posts={posts} />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
