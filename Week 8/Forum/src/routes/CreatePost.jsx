import { React, useState } from "react";
import { supabase } from "../client";
import Form from "../components/Form";

const CreatePost = () => {
  const [post, setPost] = useState({title: "", content: "", file: null, attachment: false});

  const handleCreate = async (event) => {
    event.preventDefault();

    const {data} = await supabase
      .from("Posts")
      .insert({title: post.title, content: post.content, attachment: post.attachment})
      .select();
    
    if (post.file) {
      await supabase
      .storage
      .from("forum")
      .upload(`public/${data[0].id}`, post.file, { upsert: true });
    }
    
    window.location = "/";
  }

  return (
    <div className="page-container">
      <Form post={post} setPost={setPost} />
      <button onClick={handleCreate}>Create Post</button>
    </div>
  )
};

export default CreatePost;