import { React, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../client";
import Form from "../components/Form";

const UpdatePost = () => {
  const [post, setPost] = useState({...useLocation().state, file: null});

  const handleUpdate = async (event) => {
    event.preventDefault();

    const {error} = await supabase
      .from("Posts")
      .update({title: post.title, content: post.content, attachment: post.attachment})
      .eq("id", post.id);
    
    if(post.file) {
      await supabase
      .storage
      .from("forum")
      .upload(`public/${post.id}`, post.file, { upsert: true });
    }

    window.location = `/view/${post.id}`;
  }

  return (
    <div className="page-container">
      <Form post={post} setPost={setPost} />
      <button onClick={handleUpdate}>Update Post</button>
    </div>
  );
};

export default UpdatePost;