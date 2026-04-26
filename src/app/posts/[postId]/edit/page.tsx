import EditPostForm from "./_components/EditPostForm";

const EditPostPage = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const { postId } = await params;

  return (
    <main>
      <section>
        <div className="container h-screen -mt-20 flex items-center justify-center">
          <EditPostForm id={postId} />
        </div>
      </section>
    </main>
  );
};

export default EditPostPage;
