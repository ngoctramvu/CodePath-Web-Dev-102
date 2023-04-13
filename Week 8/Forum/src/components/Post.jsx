const Post = ({post}) => {
  return (
    <div className="post">
      <h4>{post.created_at}</h4>
      <h1>{post.title}</h1>
      <h4>{post.content}</h4>
      <h4>{post.upvotes} upvotes</h4>
      {post.attachment && <img src={post.attachment} />}
    </div>
  );
};

export default Post;