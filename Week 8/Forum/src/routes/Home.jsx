import { React, useState, useEffect } from "react";
import { supabase } from "../client";
import PostPreview from "../components/PostPreview";

const Home = ({}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const { data } = await supabase
        .from('Posts')
        .select();
      
      setPosts(data);
    }

    fetchAllPosts().catch(console.error);
  }, []);

  return (
    <div className="page-container">
      {posts.map((post) =>
        <PostPreview
          key={post.id}
          post={post}/>
      )}
    </div>
  );
};

export default Home;