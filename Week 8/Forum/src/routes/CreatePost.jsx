import { React, useState } from "react";
import Form from "../components/Form";
import { supabase } from "../client";

const CreatePost = () => {
  const [post, setPost] = useState({title: "", content: "", file: ""});

  const handleCreate = async (event) => {
    event.preventDefault();

    const {data} = await supabase
      .from("Posts")
      .insert({title: post.title, content: post.content})
      .select();
    
    await supabase
      .storage
      .from("forum")
      .upload(`public/${data[0].id}`, post.file, { upsert: true });
    
    window.location = "/";
  }

  return (
    <div className="create-page">
      <Form post={post} setPost={setPost} />
      <button onClick={handleCreate}>Create Post</button>
    </div>
  )
};

export default CreatePost;