import { Post } from "@/types/post";
import EditPostForm from "./_components/EditPostForm";
import { getPost } from "@/lib/api";

const EditPostPage = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const { postId } = await params;

  const post: Post = await getPost(postId);

  return (
    <main>
      <section>
        <div className="container h-screen -mt-20 flex items-center justify-center">
          <EditPostForm post={post} />
        </div>
      </section>
    </main>
  );
};

export default EditPostPage;
