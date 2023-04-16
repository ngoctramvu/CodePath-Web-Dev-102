import { React, useState, useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { supabase } from "../client";
import PostPreview from "../components/PostPreview";
import { Link } from "react-router-dom";


const Home = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const { data } = await supabase
        .from("Posts")
        .select();
      
      setPosts(data);
    }

    fetchAllPosts().catch(console.error);
  }, []);

  const sortByNewest = async () => {
    const { data } = await supabase
      .from("Posts")
      .select()
      .order("created_at", { ascending: false });
    
      setPosts(data);
  }

  const sortByMostPopular = async () => {
    const { data } = await supabase
      .from("Posts")
      .select()
      .order("upvotes", { ascending: false });
    
    setPosts(data);  
  }


  return (
    <div className="page-container">
      <BeatLoader
        color={"#82A0BC"}
        loading={posts == null}
        size={20}
        margin={5}
        cssOverride={{
          display: "block",
          margin: "200px auto",
        }}
      />

      {posts && (        
        <div>
          {posts.length == 0 ? (
            <div>
              <br/>
              <h3>No Post Yet!</h3>
              <br/>
              <Link to="/create"><button>Create First Post</button></Link>
            </div>
          ) : (
            <div className="post-filters">
              Order by: 
              <button onClick={sortByNewest}>Newest</button>
              <button onClick={sortByMostPopular}>Most Popular</button>
            </div>
          )}

          {posts.map((post) =>
            <PostPreview
              key={post.id}
              post={post}/>
          )}
        </div>
      )}

    </div>
  );
};

export default Home;