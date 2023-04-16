import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { supabase } from "../client";
import CommentSection from "./CommentSection";

const Post = ({post, setPost}) => {
  const [attachmentURL, setAttachmentURL] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (post.attachment){
      const {data} = supabase
        .storage
        .from('forum')
        .getPublicUrl(`public/${post.id}`);

      setAttachmentURL(`${data.publicUrl}?${Date.now()}`);
    }
  }, []);

  const handleUpvote = async (event) => {
    event.preventDefault();
    
    const {data} = await supabase
      .from("Posts")
      .update({upvotes: post.upvotes + 1})
      .eq("id", post.id);
    
    setPost((prev) => ({...prev, upvotes: post.upvotes + 1}));
  }

  const handleEdit = () => {
    navigate(`/update/${post.id}`, {
      state: post
    });
  }

  const handleDelete = async (event) => {
    event.preventDefault();

    await supabase
      .from("Posts")
      .delete()
      .eq("id", post.id);
    
    await supabase
      .from("Comments")
      .delete()
      .eq("post_id", post.id);

    await supabase
      .storage
      .from("forum")
      .remove([`public/${post.id}`]);

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
        <ClipLoader
          color={"#82A0BC"}
          loading={post.attachment && attachmentURL == null}
          size={50}
          cssOverride={{
            display: "block",
            margin: "200px auto",
          }}
        />
        {attachmentURL && <img src={attachmentURL} height="200px" className="post-attachment" alt="post attachment"/>}
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
      <CommentSection post={post} />
    </div>
  );
};

export default Post;