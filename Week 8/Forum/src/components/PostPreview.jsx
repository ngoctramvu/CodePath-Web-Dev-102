import { Link } from "react-router-dom";

const PostPreview = ({post}) => {

  return (
    <div className="post-preview">
      <Link to={`/view/${post.id}`}>
        <h4>{post.created_at}</h4>
        <h2>{post.title}</h2>
        <h4>{post.upvotes}</h4>
      </Link>
    </div>
  )
};

export default PostPreview;