import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

const PostPreview = ({post}) => {

  return (
    <div className="post-container">
      <Link to={`/view/${post.id}`}>
        <p>Posted <ReactTimeAgo date={Date.parse(post.created_at)} locale="en-US" /></p>
        <h3>{post.title}</h3>
        <p>{post.upvotes} upvotes</p>
      </Link>
    </div>
  )
};

export default PostPreview;