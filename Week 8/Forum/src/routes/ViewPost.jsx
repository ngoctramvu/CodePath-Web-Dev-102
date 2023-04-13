import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import Post from "../components/Post";

const ViewPost = () => {
  const [post, setPost] = useState({});

  const {id} = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("Posts")
        .select()
        .eq("id", id);

      const response = await supabase
        .storage
        .from('forum')
        .getPublicUrl('public/' + id + '.png');
      
      setPost({...data[0], attachment: response.data.publicUrl});
    };

    fetchPost().catch(console.error);
  }, [])

  return (
    <div className="view-page">
      <Post post={post}/>
    </div>
  )
};

export default ViewPost;