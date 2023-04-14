import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import Post from "../components/Post";

const ViewPost = () => {
  const [post, setPost] = useState(null);

  const {id} = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("Posts")
        .select()
        .eq("id", id);
      
      setPost(data[0]);
    };

    fetchPost().catch(console.error);
  }, [])

  return (
    <div className="page-container">
      {post && <Post post={post} setPost={setPost}/>}
    </div>
  )
};

export default ViewPost;