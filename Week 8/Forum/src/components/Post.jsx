import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

const Post = ({post, setPost}) => {
  const [attachmentURL, setAttachmentURL] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (post.attachment){
      const {data} = supabase
        .storage
        .from('forum')
        .getPublicUrl(`public/${post.id}`);

        setAttachmentURL(data.publicUrl);
    }
  }, []);

  const handleUpvote = async (event) => {
    event.preventDefault();
    
    const {data} = await supabase
      .from("Posts")
      .update({upvotes: post.upvotes + 1})
      .eq("id", post.id);
    
    setPost((prev) => ({...prev, upvotes: post.upvotes + 1}))
  }

  const handleEdit = () => {
    navigate(`/update/${post.id}`, {
      state: post
    });
  }

  const handleDelete = async (event) => {
    event.preventDefault();

    const {error} = await supabase
      .from("Posts")
      .delete()
      .eq("id", post.id);
    
    window.location = "/";
  }

  return (
    <div className="post-container">
      <div className="post-header">
        <p>Posted <ReactTimeAgo date={Date.parse(post.created_at)} locale="en-US" /></p>
        <h3>{post.title}</h3>
      </div>
      <div className="post-body">
        <p>{post.content}</p>
        {attachmentURL && <img src={attachmentURL} className="post-attachment" alt="post attachment"/>}
      </div>
      <div className="post-footer">
        <div className="upvote-bar">
          <i className="fa fa-thumbs-o-up fa-2x" onClick={handleUpvote}></i>
          <span>{post.upvotes} upvotes</span>
        </div>
        <div className="edit-bar">
          <span className="fa-stack fa-lg" onClick={handleEdit}>
            <i className="fa fa-circle fa-stack-2x fa-inverse icon-background" />
            <i className="fa fa-pencil fa-stack-1x" />
          </span> 
          <span className="fa-stack fa-lg" onClick={handleDelete}>
            <i className="fa fa-circle fa-stack-2x fa-inverse icon-background" />
            <i className="fa fa-trash-o fa-stack-1x" />
          </span> 
        </div>
      </div>
    </div>
  );
};

export default Post;