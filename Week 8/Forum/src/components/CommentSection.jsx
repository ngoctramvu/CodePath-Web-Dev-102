import { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { supabase } from "../client";
import Comment from "./Comment";

const CommentSection = ({post}) => {
  const [allComments, setAllComments] = useState(null);
  const [comment, setComment] = useState({content: "", post_id: post.id});

  useEffect(() => {
    const fetchComments = async () => {
      const {data} = await supabase
        .from("Comments")
        .select()
        .eq("post_id", post.id);
      
      setAllComments(data);
    }

    fetchComments().catch(console.error);
  }, []);

  const handleCommentChange = (event) => {
    setComment((prev) => ({...prev, content: event.target.value}));
  }

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    const {data} = await supabase
      .from("Comments")
      .insert({content: comment.content, post_id: comment.post_id})
      .select();

    setAllComments((prev) => [...prev, data[0]]);
    setComment((prev) => ({...prev, content: ""}));
  }

  return (
    <div className="comment-container">
      <div className="comment-display">
        <BeatLoader
          color={"#545E75"}
          loading={allComments == null}
          size={20}
          margin={5}
          cssOverride={{
            display: "block",
            margin: "20px auto",
          }}
        />
        {allComments && allComments.map((comment) => (
          <Comment key={comment.id} id={comment.id} content={comment.content} setAllComments={setAllComments}/>
        ))}
      </div>
      <div className="comment-input">
        <input type="text" value={comment.content} placeholder="Leave a comment..." onChange={handleCommentChange}/>
        <button onClick={handleSubmitComment}>Post</button>
      </div>
    </div>
  );
};

export default CommentSection;