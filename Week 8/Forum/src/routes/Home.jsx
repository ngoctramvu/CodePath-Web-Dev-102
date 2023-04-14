import { React, useState, useEffect } from "react";
import { supabase } from "../client";
import PostPreview from "../components/PostPreview";

const Home = () => {
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

  const sortByNewest = () => {
    setPosts((posts) => ([...posts].sort((a, b) => (a.created_at < b.created_at) ? 1 : -1)));
  }

  const sortByMostPopular = () => {
    setPosts((posts) => ([...posts].sort((a, b) => (a.upvotes < b.upvotes) ? 1 : -1)));
  }

  useEffect(() => {

  }, [posts])

  return (
    <div className="page-container">
      <div className="post-filters">
        Order by: 
        <button onClick={sortByNewest}>Newest</button>
        <button onClick={sortByMostPopular}>Most Popular</button>
      </div>
      {posts.map((post) =>
        <PostPreview
          key={post.id}
          post={post}/>
      )}
    </div>
  );
};

export default Home;